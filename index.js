const fs = require('fs');
const qrcode = require('qrcode-terminal')

const { Client, LocalAuth } = require('whatsapp-web.js')

const SESSION_FILE_PATH = "./.wwebjs_auth/";


const country_code = process.env.COUNTRY_CODE;
const number = process.env.NUMBER;
const EXTENSION = '@c.us';

// borrar cache
if (fs.existsSync(SESSION_FILE_PATH)) {
    fs.rmdir(SESSION_FILE_PATH, { recursive: true },
        response => {});
}

const client = new Client({
    authStrategy: new LocalAuth()
});

client.initialize();

// qr generate
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

// cliente
client.on('ready', () => {
    console.log('El cliente está listo');
})

// autenticado
client.on('authenticated', session => {
    console.log('Se ha autentificado')
})

// error de autorización
client.on('auth_failure', msg => {
    console.error('Se ha producido un error: ' + msg)
});

// escucha mensajes
client.on('message', msg => {
    if (msg.body.toLowerCase().includes('hola')) {
        client.sendMessage(msg.from, 'que tal ' + msg._data.notifyName)
    }

    if (msg.from.includes(process.env.LAURA_NUMBER)) {
        client.sendMessage(msg.from, msg._data.notifyName + ', eres una máquina')
    }

    if (msg.from.includes(process.env.NAI_NUMBER)) {
        client.sendMessage(msg.from, 'Feliz cumpleaños!')
    }

    if (msg.body.toLowerCase().includes('y tu')) {
        client.sendMessage(msg.from, 'Yo muy bien, pero Pascual no lo sé, hace tiempo que no lo veo')
    }
})