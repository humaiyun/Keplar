const Command = require("../Structures/Command.js");
const config = require("../Data/config.json");
const Discord = require("discord.js");

module.exports = new Command({
    name: "stats",
    description: "Displays statistics of the bot",
    usage: `\`${config.prefix}stats\``,
    permission: "SEND_MESSAGES",
    async run(message, args, client) {
        let totalSeconds = message.client.uptime / 1000;
        const days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        const hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);

        const uptime = `\`\`\`${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds\`\`\``;

        const embed = new Discord.MessageEmbed()
            .setTitle(`${message.client.user.username} Stats`)
            .addFields({
                name: "Servers",
                value: `\`\`\`${client.guilds.cache.size}\`\`\``,
                inline: true
            }, {
                name: "Users",
                value: `\`\`\`${client.users.cache.size}\`\`\``,
                inline: true
            }, {
                name: "Channels",
                value: `\`\`\`${client.channels.cache.size}\`\`\``,
                inline: true
            }, {
                name: "Uptime",
                value: uptime,
                inline: true
            }, {
                name: "Ping",
                value: `\`\`\`${Math.round(message.client.ws.ping)} ms\`\`\``,
                inline: true
            }, {
                name: "RAM",
                value: `\`\`\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\`\`\``,
                inline: true
            })
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL());

        message.channel.send({ embeds: [embed] })
    }
})