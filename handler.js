const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

global.plugins = { before: [], after: [], commands: {} };

global.loadPlugins = async () => {
    const pluginFolder = path.join(__dirname, 'plugins');
    const pluginFiles = fs.readdirSync(pluginFolder).filter(file => 
        file.endsWith('.js') || file.endsWith('.ts') || file.endsWith('.mjs')
    );

    for (const file of pluginFiles) {
        const pluginPath = path.join(pluginFolder, file);
        const ext = path.extname(file);

        try {
            let plugin;
            if (ext === '.ts') {
                const result = await esbuild.build({
                    entryPoints: [pluginPath],
                    bundle: true,
                    write: false,
                    platform: 'node',
                    format: 'cjs',
                });

                const tempFile = path.join(__dirname, `temp-${file}.js`);
                fs.writeFileSync(tempFile, result.outputFiles[0].text);

                plugin = require(tempFile).default || require(tempFile);
                console.log(`Plugin loaded: ${file}`);

                fs.unlinkSync(tempFile);
            } else if (ext === '.mjs') {
                plugin = (await import(pluginPath)).default || (await import(pluginPath));
                console.log(`Plugin loaded: ${file}`);
            } else if (ext === '.js') {
                delete require.cache[require.resolve(pluginPath)];
                plugin = require(pluginPath);
                console.log(`Plugin loaded: ${file}`);
            }

            if (plugin.before) {
                global.plugins.before.push(plugin);
            }
            if (plugin.after) {
                global.plugins.after.push(plugin);
            }
            if (plugin.command) {
                global.plugins.commands[file] = plugin;
            }

        } catch (error) {
            console.error(`Failed to load plugin ${file}:`, error);
        }
    }
};

global.loadPlugins();

const pluginFolder = path.join(__dirname, 'plugins');
fs.watch(pluginFolder, (eventType, filename) => {
    if (filename && (filename.endsWith('.js') || filename.endsWith('.ts') || filename.endsWith('.mjs'))) {
        console.log(`Detected change in plugin: ${filename}`);
        global.loadPlugins();
    }
});

module.exports = async (m, data) => {
    try {
        const { command } = data;
        
        for (let beforePlugin of global.plugins.before) {
            try {
                await beforePlugin(m, data);
            } catch (error) {
                console.error('Before plugin error:', error);
            }
        }

        const plugin = Object.values(global.plugins.commands).find(p => Array.isArray(p.command) ? p.command.includes(command) : p.command instanceof RegExp ? p.command.test(command) : p.command == command);

        if (plugin) {
            await plugin(m, data);
        }

        for (let afterPlugin of global.plugins.after) {
            try {
                await afterPlugin(m, data);
            } catch (error) {
                console.error('After plugin error:', error);
            }
        }
    } catch (error) {
        console.error('Handler error:', error);
        m.reply('❌ Terjadi kesalahan pada bot.');
    }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update ${__filename}`);
    delete require.cache[file];
    require(file);
});
