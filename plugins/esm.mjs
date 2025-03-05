
let handler = async (m) => {
    m.reply("Hola");
};

handler.command = /^(esm)$/i;

export default handler;