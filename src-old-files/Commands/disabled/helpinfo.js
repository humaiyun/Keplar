/* https://www.npmjs.com/package/discord.js-pagination */
const Command = require("../Structures/Command.js");
const config = require("../Data/config.json");
const Discord = require("discord.js");
const paginationEmbed = require('discordjs-button-pagination');

const requireFolder = require("require-folder");
const content = requireFolder("./src/Commands", { exclude: ["disabled", "helpinfo.js"] });

const Event = require("../Structures/Event.js");
const intents = new Discord.Intents(32767);


module.exports = new Command({
    name: "helpinfo",
    description: "Detailed explanation of the supported commands and their usage",
    usage: `\`${config.prefix}helpinfo\``,
    permission: "SEND_MESSAGES",

    async run(message, args, client) {
        const homePage = new Discord.MessageEmbed()
            .setTitle("Advanced Help Command")
            .setColor("RANDOM")
            .setDescription(`Detailed list of all the supported commands, and how to use them.\n\n**Legend**\n< required >\n[ optional ]`) //\n\n**Table of Contents**\n1\n2\n3\n4\n5\n6\n7
            .setFields({
                name: `Table of Contents`,
                value: `\u200B`,
                inline: false
            }, {
                name: `Information`,
                value: `\u200B`,
                inline: false
            })
        const information = new Discord.MessageEmbed()
            .setTitle("information")
            .setColor("RANDOM")
            .setDescription("information");
        const images = new Discord.MessageEmbed()
            .setTitle("images")
            .setColor("RANDOM")
            .setDescription("images");
        const fun = new Discord.MessageEmbed()
            .setTitle("fun")
            .setColor("RANDOM")
            .setDescription("fun");
        const cryptocurrency = new Discord.MessageEmbed()
            .setTitle("cryptocurrency")
            .setColor("RANDOM")
            .setDescription("cryptocurrency");
        const misc = new Discord.MessageEmbed()
            .setTitle("misc")
            .setColor("RANDOM")
            .setDescription("misc");
        const utility = new Discord.MessageEmbed()
            .setTitle("utility")
            .setColor("RANDOM")
            .setDescription("utility");
        const pages = [homePage, information, images, fun, cryptocurrency, misc, utility]

        const button1 = new Discord.MessageButton().setCustomId("help_previous").setEmoji('<:neox_leftarrow:877767124544782368>').setStyle("PRIMARY").setDisabled(false); //.setLabel("Previous")
        const button2 = new Discord.MessageButton().setCustomId("help_next").setEmoji('<:neox_rightarrow:877765155230994482>').setStyle("PRIMARY").setDisabled(false); //.setLabel("Next")
        const button3 = new Discord.MessageButton().setCustomId("help_close").setEmoji('❌').setLabel("Close Menu").setStyle("DANGER").setDisabled(false);
        const confirmationRow = new Discord.MessageActionRow()
            .addComponents(button1, button2, button3);

        paginationEmbed(message, pages, [button1, button2], 180000);

    }
});
