/* https://theaxolotlapi.netlify.app/ */

const Discord = require("discord.js");
const Command = require("../Structures/Command.js");
const config = require("../Data/config.json");
const got = require("got");

module.exports = new Command({
    name: "axolotl",
    description: "Get a random image and fact of an axolotl",
    usage: `\`${config.prefix}axolotl\``,
    permission: "SEND_MESSAGES",

    async run(message, args, client) {
        got("https://axoltlapi.herokuapp.com/", { JSON: true })
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

                const axolotlImg = content.url;
                const axolotlFact = content.facts;

                const axolotlEmbed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`:squid: Random Axolotl Fact`)
                    .setDescription(`\`\`\`${axolotlFact}\`\`\`\n\n`)
                    .setImage(axolotlImg)
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                message.channel.send({ embeds: [axolotlEmbed] });
            })

    }
});
