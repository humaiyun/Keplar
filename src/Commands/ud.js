/* https://www.npmjs.com/package/urban-dictionary npm install urban-dictionary */

const Command = require("../Structures/Command.js");
const Discord = require("discord.js");
const urban = require('relevant-urban');
const config = require("../Data/config.json");

module.exports = new Command({
    name: "ud",
    description: "Search the Urban Dictionary definition of a word or sentence.",
    permission: "SEND_MESSAGES",
    async run(message, args, client) {

        const word = args.splice(1).join(" ");

        if (!word) return message.reply(`You must specify a word!\nExample: \`${config.prefix}ud hello\``);

        // const definition = await urban(args[1].join(' ')).catch(err => {
        //     message.reply(`"${args}" not found...`);
        // });

        const definition = await urban(word).catch(err => {
            message.reply(`"${word}" not found...`);
        })
        const defEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`${definition.word}`)
            .setURL(definition.urbanURL)
            .addFields({
                name: ":notebook_with_decorative_cover: Description",
                value: `${definition.definition}\n` ? `${definition.definition}\n` : "No description found...",
                inline: false
            }, {
                name: ":bookmark: Example",
                value: `${definition.example}\n` ? `${definition.example}\n` : "No example found...",
                inline: false
            }, {
                name: ":writing_hand: Author",
                value: `${definition.author}\n` ? `${definition.author}\n` : "No author found...",
                inline: false
            }, {
                name: ":bar_chart: Rating",
                value: `:thumbsup:     ${definition.thumbsUp}     |     :thumbsdown:     ${definition.thumbsDown} \n`,
                inline: false
            })
            .setTimestamp();


        const sendEmbed = () => {
            message.channel.send({ embeds: [defEmbed] });
        }
        sendEmbed();

    }
});