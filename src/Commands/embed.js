/* Documentation/Guide: https://discordjs.guide/popular-topics/embeds.html */
const Discord = require("discord.js");
const Command = require("../Structures/Command.js");


module.exports = new Command({
    name: "embed",
    description: "Shows an embed",
    async run(message, arcs, client) {
        const embed = new Discord.MessageEmbed();

        embed.setTitle("GitHub Profile")
             .setColor("#9ec2ff")
             .setAuthor(
                 message.author.username, 
                 message.author.avatarURL({ dynamic: true }),
                 "https://github.com/humaiyun" 
             )
             .setDescription("The link to my GitHub profile");


        message.channel.send({ embeds: [embed] });

    }
});