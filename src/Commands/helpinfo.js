/* https://www.npmjs.com/package/discord.js-pagination */
const Command = require("../Structures/Command.js");
const config = require("../Data/config.json");
const Discord = require("discord.js");
const pagination = require("discord.js-pagination");
const discordButtons = require('discord-buttons');


module.exports = new Command({
    name: "helpinfo",
    description: "Detailed explanation of the supported commands and their usage",
    usage: `\`${config.prefix}helpinfo\``,
    permission: "SEND_MESSAGES",
    async run(message, args, client) {

        const homePage = new Discord.MessageEmbed()
            .setColor("#0900FF")
            .setTitle("Advanced Help Command")
            .setFields({
                name: `:pinched_fingers: About \`${client.user.username}\``,
                value: "`This is a multipurpose bot. \n\n Use the arrows to move pages`",
                inline: false
            }, {
                name: ":robot: Bot Version",
                value: "`1.0.0`",
                inline: true
            }, {
                name: ":island: Bot Name",
                value: `\`${client.user.username}\``,
                inline: true
            }, {
                name: ":key: Prefix",
                value: `\`${config.prefix}\``,
                inline: true
            }, {
                name: ":scroll: Pages",
                value: `\`1. :nazar_amulet: Information\`\n\`2. :video_game: Fun\`\n\`3. :game_die: Gamble\`\n\`4. :wrench: Utility\`\n`,
                inline: true
            });

        const information = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Information")
            .addFields({
                name: `help`,
                value: "help desc",
                inline: false
            });

        const fun = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Fun")
            .addFields({
                name: "ud",
                description: "ud desc",
                inline: false
            });

        const gamble = new Discord.MessageEmbed()
            .setColor("#RANDOM")
            .setTitle("Gamble")
            .addFields({
                name: "coinflip",
                description: "coinflip desc",
                inline: false
            });

        const utility = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Utility")
            .addFields({
                name: "clear",
                description: "clear dec",
                inline: false
            });

        const pages = [
            homePage,
            information,
            fun,
            gamble,
            utility
        ]

        const emojiList = [":arrow_left:", ":arrow_right:"];
        const timeout = 180000; // 3 minutes

        pagination(Discord.message, pages, emojiList, timeout);

        message.channel.send("helpinfo.js")

        //console.log("helpinfo.js:49: " + Client.commands.get);
    }
});