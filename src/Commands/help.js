const Command = require("../Structures/Command.js");
const config = require("../Data/config.json");
const Discord = require("discord.js");

module.exports = new Command({
    name: "help",
    description: "List of all supported commands",
    usage: `\`${config.prefix}help\``,
    permission: "SEND_MESSAGES",
    async run(message, args, client) {

        const helpEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor("Command List", message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Here are the list of commands!\nFor more info on specific commands, type \`${config.prefix}helpinfo\``)
            .addFields({
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
                name: ":video_game: Fun",
                value: "`ud` | `meme` | `advice` | `pokemon` | `xkcd` ",
                inline: false
            }, {
                name: ":coin: Cryptocurrency",
                value: "`crypto`",
                inline: false
            }, {
                name: ":game_die: Gamble",
                value: "`coinflip`",
                inline: false
            }, {
                name: ":wrench: Utility",
                value: "`clear` | `define`",
                inline: false
            });
        message.channel.send({ embeds: [helpEmbed] });
    }
});