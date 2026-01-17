const mineflayer = require('mineflayer');
const config = require('./settings.json');

const bot = mineflayer.createBot({
    host: config.server.ip,
    port: config.server.port,
    username: config["bot-account"].username,
    version: config.server.version, // Keep this as 1.18.2
    checkTimeoutInterval: 120000,   // [FIX] Increases timeout to 120 seconds for Fabric lag
    physicsEnabled: false          // [FIX] Prevents physics errors during the login phase
});

// Re-enable physics once the bot has safely spawned
bot.once('spawn', () => {
    console.log(`[BotLog] ${bot.username} spawned successfully.`);
    setTimeout(() => {
        bot.physicsEnabled = true;
    }, 2000);
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
