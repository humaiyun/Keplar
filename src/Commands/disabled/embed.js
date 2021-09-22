/* Documentation: https://discordjs.guide/popular-topics/embeds.html */
const Discord = require("discord.js");
const Command = require("../Structures/Command.js");
const config = require("../Data/config.json");


module.exports = new Command({
    name: "embed",
    description: "Bot information",
    permission: "SEND_MESSAGES",
    async run(message, args, client) {
        const embed = new Discord.MessageEmbed();

        embed.setTitle("Bot Info")
            .setColor("#9ec2ff")
            .setAuthor(
                message.author.username,
                message.author.avatarURL({ dynamic: true })
            )
            .setDescription(`A bot that has various functions\n\nType **${config.prefix}help** for more info`) // [description](URL)
            .setThumbnail(message.author.avatarURL({ dynamic: true })) // client.user
            .setTimestamp() // message.createdTimestamp
            // .setImage()
            .addFields(
                {
                    name: "Bot Version",
                    value: "1.0.0",
                    inline: true
                },
                {
                    name: "Bot Name",
                    value: client.user.username,
                    inline: true
                });
        message.channel.send({ embeds: [embed] });
    }
});