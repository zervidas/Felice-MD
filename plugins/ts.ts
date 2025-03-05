
let handler = async (m: any) => {
    await m.reply("Hola");
};

handler.command = 'ts';

export default handler;