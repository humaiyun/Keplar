const Command = require("../Structures/Command.js");
const config = require("../Data/config.json");
const fs = require("fs");
const Discord = require("discord.js");

module.exports = new Command({
    name: "help",
    description: "List of all supported commands",
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
            .setDescription(`Here are the list of commands!\nFor more info on specific commands, type \`${config.prefix}help <command>\``)
            .addFields({
                name: ":pinched_fingers: About",
                value: "This is a multipurpose bot",
                inline: false
            }, {
                name: ":nazar_amulet: Information",
                value: "`help` | `ping` | `embed`",
                inline: false
            }, {
                name: ":game_die: Fun",
                value: "`ud`",
                inline: false
            }, {
                name: ":wrench: Utility",
                value: "`clear`",
                inline: false
            });
        message.channel.send({ embeds: [helpEmbed] });

        // get list of file names that end in ".js" in /src/Commands 
        // let fileNames = fs.readdirSync(__dirname).filter(files => files.endsWith(".js"));
        // console.log("File Names in /src/Commands/: " + "[ " + fileNames.toString() + " ]");
        //console.log("\nhelp.js: help args[0]: " + help + " | help args[1]: " + commandName);



    }
});