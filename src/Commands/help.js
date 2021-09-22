const Command = require("../Structures/Command.js");
const config = require("../Data/config.json");
const fs = require("fs");
const Discord = require("discord.js");

module.exports = new Command({
    name: "help",
    description: "List of all supported commands",
    usage: `\`${config.prefix}help\``,
    permission: "SEND_MESSAGES",
    async run(message, args, client) {
        // message.channel.send("Supported Commands:\n\n" +
        //     `**${config.prefix}help** - Displays the help menu\n**${config.prefix}ping** - Show bot's ping and round-message delay` +
        //     `**\n${config.prefix}botinfo** - Shows bot information\n**${config.prefix}clear <num>** - Clears previous <1 to 75> messages`);

        // const help = args[0].toLowerCase();
        // const commandName = args[1].toLowerCase();
        // const user = message.author.tag;

        const helpEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            //.setTitle(`Prefix - ${config.prefix}`)
            .setAuthor("Command List", message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Here are the list of commands!\nFor more info on specific commands, type \`${config.prefix}helpinfo\``)
            .addFields({
                name: ":pinched_fingers: About",
                value: "`This is a multipurpose bot`",
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
                name: ":nazar_amulet: Information",
                value: "`help` | `helpinfo` | `ping`",
                inline: false
            }, {
                name: ":game_die: Gamble",
                value: "`coinflip`",
                inline: false
            }, {
                name: ":video_game: Fun",
                value: "`ud` | `meme` | `advice` | `pokemon`",
                inline: false
            }, {
                name: ":wrench: Utility",
                value: "`clear`",
                inline: false
            });
        message.channel.send({ embeds: [helpEmbed] });

        //message.channel.send(`Name: ${Pokemon.name}\nUsage: ${Pokemon.usage}`);
        //console.log("help.js:61: " + `);

        //console.log(`help.js:66: meme.name: ${meme.name}\nmeme.description: ${meme.description}\coinflip.name: ${coinflip.name}\coinflip.description: ${coinflip.description}`);

    }
});