
let handler = async (m) => {
    m.reply("Hola");
};

handler.command = ["cjs"];

module.exports = handler;