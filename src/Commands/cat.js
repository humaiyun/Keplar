/* https://docs.thecatapi.com/ */

const Discord = require("discord.js");
const Command = require("../Structures/Command.js");
const config = require("../Data/config.json");
const got = require("got");

module.exports = new Command({
    name: "cat",
    description: "Get a random image of a cat",
    usage: `\`${config.prefix}cat\``,
    permission: "SEND_MESSAGES",

    async run(message, args, client) {
        got("https://api.thecatapi.com/v1/images/search", { JSON: true })
            .catch((err) => {
                const throwEmbed = new Discord.MessageEmbed()
                    .setAuthor("Error")
                    .setColor("RED")
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                    .setDescription(`Error Message: \`${err}\``);
                message.channel.send({ embeds: [throwEmbed] });
            })
            .then(result => {
                const content = JSON.parse(result.body);

                const catImg = content[0].url;

                const catEmbed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`:smiley_cat:   Cat`)
                    .setImage(catImg)
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                message.channel.send({ embeds: [catEmbed] });
            })

    }
});
