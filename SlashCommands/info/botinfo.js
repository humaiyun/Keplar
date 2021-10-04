const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const os = require("os");
const cpuStat = require("cpu-stat");

module.exports = {
    userPermissions: ["SEND_MESSAGES"],
    ...new SlashCommandBuilder()
        .setName("botinfo")
        .setDescription("Shows a detailed list of bot and server information"),


    run: async (client, interaction, args) => {

        cpuStat.usagePercent(function (err, percent, seconds) {
            if (err) return console.log(`botinfo.js:16: Error: ${err}`);

            let connectedchannelsamount = 0;
            let guilds = client.guilds.cache.map((guild) => guild);
            for (let i = 0; i < guilds.length; i++) {
                if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
            }
            if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;

            interaction.followUp({
                embeds: [new MessageEmbed()
                    //.setAuthor(client.user.username, client.user.displayAvatarURL())
                    .setTitle("__**Bot & Server Information**__")
                    .setColor("RANDOM")
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                    .addFields({
                        name: ":hourglass: Memory Usage",
                        value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB\``,
                        inline: true
                    }, {
                        name: ":alarm_clock: Uptime ",
                        value: `${getUpTime()}`,
                        inline: true
                    }, {
                        name: "\u200b",
                        value: "\u200b",
                        inline: true
                    }, {
                        name: ":open_file_folder: Users",
                        value: `\`Total: ${client.users.cache.size} Users\``,
                        inline: true
                    }, {
                        name: ":open_file_folder: Servers",
                        value: `\`Total: ${client.guilds.cache.size} Servers\``,
                        inline: true
                    }, {
                        name: ":open_file_folder: Voice-Channels",
                        value: `\`Total: ${client.channels.cache.filter((ch) => ch.type === "GUILD_VOICE" || ch.type === "GUILD_STAGE_VOICE").size}\``,
                        inline: true
                    }, { // { name: "🔊 Connections", value: `\`${connectedchannelsamount} Connections\``, inline: true }, 
                        name: ":frog: Discord.js",
                        value: `\`v${Discord.version == "v13.2.0-dev.1633133131.fe95005" ? "v13.2.0" : "v13.2.0"}\``,
                        inline: true
                    }, {
                        name: ":four_leaf_clover: Node.js",
                        value: `\`${process.version}\``,
                        inline: true
                    }, {
                        name: "\u200b",
                        value: "\u200b",
                        inline: true
                    }, {
                        name: ":desktop: CPU",
                        value: `\`${os.cpus().map((i) => `${i.model}`)[0] == "AMD Ryzen 5 2600 Six-Core Processor            " ? "AMD Ryzen 5 2600 Six-Core Processor @ 3.90 GHz" : "Not found"}\``,
                        inline: true
                    }, {
                        name: ":desktop: CPU usage",
                        value: `\`${percent.toFixed(2)}%\``,
                        inline: true
                    }, {
                        name: ":desktop: Architecture",
                        value: `\`${os.arch()}\``,
                        inline: true
                    }, {
                        name: "💻 Platform",
                        value: `\`\`${os.platform() === "win32" ? "Windows 10 Pro 64bit" : "Not found"}\`\``,
                        inline: true
                    }, {
                        name: ":incoming_envelope: API Latency",
                        value: `\`${client.ws.ping}ms\``,
                        inline: true
                    }, {
                        name: "\u200b",
                        value: "\u200b",
                        inline: true
                    })]
            });


            /**
             * 
             * @returns time conversion to d:h:m:s
             */
            function getUpTime() {
                let totalSeconds = interaction.client.uptime / 1000;
                const days = Math.floor(totalSeconds / 86400);
                totalSeconds %= 86400;
                const hours = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                const minutes = Math.floor(totalSeconds / 60);
                const seconds = Math.floor(totalSeconds % 60);
                return uptime = `\`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds\``;
            }

        });








    }


}