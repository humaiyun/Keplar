const Command = require('../Structures/Command.js');
const config = require("../Data/config.json");
const Discord = require('discord.js');
const paginationEmbed = require('discordjs-button-pagination');

module.exports = new Command({
    name: "example",
    description: "example",
    usage: `\`${config.prefix}example\``,
    permission: "SEND_MESSAGES",

    async run(message, args, client) {

        const button1 = new Discord.MessageButton()
            .setCustomId('previousbtn')
            .setEmoji('◀')
            .setStyle('PRIMARY');

        const button2 = new Discord.MessageButton()
            .setCustomId('nextbtn')
            .setEmoji('▶')
            .setStyle('SECONDARY');

        const embed1 = new Discord.MessageEmbed()
            .setTitle(`example title`)
            .setDescription(`example description`)
            .setColor('RANDOM')

        const embed2 = new Discord.MessageEmbed()
            .setTitle(`example title`)
            .setDescription(`example description`)
            .setColor('RANDOM')

        paginationEmbed(message, [embed1, embed2], [button1, button2], 180000);
    }
})