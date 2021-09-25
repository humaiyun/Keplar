/* https://www.npmjs.com/package/discord.js-pagination */
const Command = require("../Structures/Command.js");
const config = require("../Data/config.json");
const Discord = require("discord.js");

module.exports = new Command({
    name: "helpinfo",
    description: "Detailed explanation of the supported commands and their usage",
    usage: `\`${config.prefix}helpinfo\``,
    permission: "SEND_MESSAGES",

    async run(message, args, client) {

        //console.log(`message.author.username: ${message.author} \nclient.user.tag: ${client.user.tag}`);
        //const messageID = message.author;

        const homePage = new Discord.MessageEmbed()
            .setTitle("Home Page")
            .setColor("RANDOM")
            .setDescription("Advanced Help Command");
        const information = new Discord.MessageEmbed()
            .setTitle("information")
            .setColor("RANDOM")
            .setDescription("information");
        const fun = new Discord.MessageEmbed()
            .setTitle("fun")
            .setColor("RANDOM")
            .setDescription("fun");
        const gamble = new Discord.MessageEmbed()
            .setTitle("gamble")
            .setColor("RANDOM")
            .setDescription("gamble");
        const utility = new Discord.MessageEmbed()
            .setTitle("utility")
            .setColor("RANDOM")
            .setDescription("utility");

        const embedPages = [homePage, information, fun, gamble, utility];
        let pageIndex = 0;

        const emojiList = ['⏪', '❌', '⏩'];

        const button1 = new Discord.MessageButton()
            .setCustomId("help_menu_previous")
            .setEmoji('⏪')
            .setLabel("Previous")
            .setStyle("SUCCESS")
            .setDisabled(false);

        const button2 = new Discord.MessageButton()
            .setCustomId("help_menu_next")
            .setEmoji('⏩')
            .setLabel("Previous")
            .setStyle("SUCCESS")
            .setDisabled(false)

        const button3 = new Discord.MessageButton()
            .setCustomId("help_menu_close")
            .setEmoji('❌')
            .setLabel("Close Menu")
            .setStyle("DANGER")
            .setDisabled(false)

        const buttonRow = new Discord.MessageActionRow();

        //let embedMenu = message.channel.send({ embeds: [embedPages[pageIndex]] });
        message.channel.send("test", {});

    }
});



        // const embedMenu = message.channel.send({ embeds: [embedPages[0]] })
        //     .then(message => {
        //         emojiList.forEach(emoji => {
        //             message.react(emoji);
        //         })
        //     }).catch(error => console.log("helpinfo.js:57: One of the emoji's failed to react: ", error));

        // const collectUserReactionInfo = message.createReactionCollector((reaction, user) => {
        //     emojiList.includes(reaction.emoji.name) && user.id == message.author.id;
        // });

        // let pageNum = 0;

        // client.on("messageReactionAdd", (reaction, user) => {
        //     if (reaction.emoji.name === '⏪') {
        //         console.log("helpinfo.js: Left Arrow\n");
        //     }
        //     if (reaction.emoji.name === '❌') {
        //         console.log("helpinfo.js CLOSE\n");
        //     }
        //     if (reaction.emoji.name === '⏩') {
        //         console.log("helpinfo.js Right Arrow\n");
        //     }

        // });