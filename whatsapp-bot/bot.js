

// const makeWASocket = require("@whiskeysockets/baileys").default;
// const { useMultiFileAuthState } = require("@whiskeysockets/baileys");
// const axios = require("axios");
// const qrcode = require("qrcode-terminal");
// require("dotenv").config();

// async function startWhatsAppBot() {
//     const { state, saveCreds } = await useMultiFileAuthState("./auth");
//     const sock = makeWASocket({
//         auth: state,
//         printQRInTerminal: true
//     });

//     sock.ev.on("connection.update", async (update) => {
//         const { connection, qr } = update;
//         if (qr) {
//             console.log("Scan this QR Code to link your WhatsApp:");
//             qrcode.generate(qr, { small: true });
//         }
//         if (connection === "open") {
//             console.log("✅ WhatsApp Bot Connected!");
//         }
//         if (connection === "close") {
//             console.log("❌ Connection closed. Restarting...");
//             startWhatsAppBot();
//         }
//     });

//     sock.ev.on("creds.update", saveCreds);

//     sock.ev.on("messages.upsert", async (m) => {
//         const msg = m.messages[0];
//         if (!msg.message || msg.key.fromMe) return;

//         const sender = msg.key.remoteJid;
//         const text = msg.message.conversation || msg.message.extendedTextMessage?.text;

//         console.log(`📩 Received: ${text}`);

//         try {
//             const response = await axios.post(process.env.FASTAPI_URL + "/reply", { text });
//             await sock.sendMessage(sender, { text: response.data.reply });
//         } catch (error) {
//             console.error("❌ Error:", error);
//             await sock.sendMessage(sender, { text: "Sorry, an error occurred!" });
//         }
//     });
// }

// startWhatsAppBot();


const makeWASocket = require("@whiskeysockets/baileys").default;
const { useMultiFileAuthState } = require("@whiskeysockets/baileys");
const axios = require("axios");
const qrcode = require("qrcode-terminal");
require("dotenv").config();

// Ensure FASTAPI_URL is properly loaded
const FASTAPI_URL = process.env.FASTAPI_URL || "http://127.0.0.1:8000";
console.log("FastAPI URL:", FASTAPI_URL);

async function startWhatsAppBot() {
    const { state, saveCreds } = await useMultiFileAuthState("./auth");
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    });

    sock.ev.on("connection.update", async (update) => {
        const { connection, qr } = update;
        if (qr) {
            console.log("Scan this QR Code to link your WhatsApp:");
            qrcode.generate(qr, { small: true });
        }
        if (connection === "open") {
            console.log("✅ WhatsApp Bot Connected!");
        }
        if (connection === "close") {
            console.log("❌ Connection closed. Restarting...");
            startWhatsAppBot();
        }
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("messages.upsert", async (m) => {
        const msg = m.messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const sender = msg.key.remoteJid;
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text;

        console.log(`📩 Received: ${text}`);

        if (!FASTAPI_URL) {
            console.error("❌ FASTAPI_URL is not defined!");
            await sock.sendMessage(sender, { text: "Error: FASTAPI_URL is not configured." });
            return;
        }

        try {
            const response = await axios.post(`${FASTAPI_URL}/reply`, { text });
            await sock.sendMessage(sender, { text: response.data.reply });
        } catch (error) {
            console.error("❌ Error:", error.message);
            await sock.sendMessage(sender, { text: "Sorry, an error occurred while processing your request!" });
        }
    });
}

startWhatsAppBot();
