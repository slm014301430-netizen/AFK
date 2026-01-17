const mineflayer = require('mineflayer');
const config = require('./settings.json');

function createBot() {
    const bot = mineflayer.createBot({
        host: config.server.ip,
        port: config.server.port,
        username: config["bot-account"].username,
        version: config.server.version, // This will stay 1.18.2
        checkTimeoutInterval: 120000 // FIX: Increases timeout to 2 minutes for ViaBackwards lag
    });

    bot.on('login', () => {
        console.log(`[BotLog] ${bot.username} joined the server.`);
    });

    bot.on('spawn', () => {
        console.log(`[BotLog] ${bot.username} spawned in the world.`);
        // Add your auto-auth or anti-afk logic here if needed
    });

    bot.on('kicked', (reason) => {
        console.log(`[BotLog] Bot was kicked from the server. Reason: ${reason}`);
    });

    bot.on('error', (err) => {
        console.log(`[BotLog] Error encountered: ${err.message}`);
    });

    bot.on('end', () => {
        console.log(`[BotLog] Connection ended. Reconnecting in ${config.utils["auto-reconnect-delay"] / 1000} seconds...`);
        setTimeout(createBot, config.utils["auto-reconnect-delay"]);
    });
}

createBot();
