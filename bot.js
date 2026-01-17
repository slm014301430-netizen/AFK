const mineflayer = require('mineflayer');
const config = require('./settings.json');

function createBot() {
    const bot = mineflayer.createBot({
        host: config.server.ip,
        port: config.server.port,
        username: config["bot-account"].username,
        version: config.server.version, // Stays 1.18.2
        checkTimeoutInterval: 120000,   // FIX: Increases timeout to 2 minutes for Fabric/ViaBackwards lag
        physicsEnabled: false          // FIX: Prevents "Internal Error" kicks on Fabric login
    });

    bot.on('login', () => {
        console.log(`[BotLog] ${bot.username} joined the server.`);
    });

    bot.on('spawn', () => {
        console.log(`[BotLog] ${bot.username} spawned in the world.`);
        // Re-enable physics shortly after spawning to ensure stability
        setTimeout(() => { bot.physicsEnabled = true; }, 2000);
    });

    bot.on('kicked', (reason) => {
        console.log(`[BotLog] Bot was kicked. Reason: ${reason}`);
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
