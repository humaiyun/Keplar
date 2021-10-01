/* https://dictionaryapi.dev/ | https://api.dictionaryapi.dev/api/v2/entries/en/<word> */

const Discord = require("discord.js");
const Command = require("../Structures/Command.js");
const config = require("../Data/config.json");
const got = require("got");

module.exports = new Command({
    name: "define",
    description: "Get the dictionary definition of a word",
    usage: `\`${config.prefix}define <word>\``,
    permission: "SEND_MESSAGES",

    async run(message, args, client) {
        let word = args.splice(1).join(" ");

        if (!word) {
            const invalidEmbed = new Discord.MessageEmbed()
                //.setTitle("Error")
                .setColor("RED")
                //.setTimestamp()
                //.setFooter(client.user.username, client.user.displayAvatarURL())
                .setDescription(`Enter a word to get the definition of`);
            return message.reply({ embeds: [invalidEmbed] });
        }
        else {
            if (!isNaN(parseInt(word))) { // is a number
                const notAWordEmbed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle("No Definitions Found")
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                    .setDescription(`Sorry pal, we couldn't find definitions for the word you were looking for. \n\nYou can try the search again at later time or head to the web instead.`);

                return message.channel.send({ embeds: [notAWordEmbed] });
            }
            // else {
            //     const invalidEmbed = new Discord.MessageEmbed()
            //         .setTitle("Error")
            //         .setColor("RED")
            //         .setDescription(`Enter a word to get the definition of`);
            //     return message.reply({ embeds: [invalidEmbed] });
            // }
        }

        got(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, { JSON: true })
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

                const wordWord = content[0].word; //.charAt(0).toUpperCase() + wordWord.slice(1)
                const wordOrigin = content[0].origin;
                const wordPartOfSpeech = content[0].meanings[0].partOfSpeech;
                const wordDefinition = content[0].meanings[0].definitions[0].definition;
                const wordPhonetic = content[0].phonetic;
                const wordExample = content[0].meanings[0].definitions[0].example;

                const wordEmbed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(wordWord)
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                    .setDescription(`**Definition**\n\`${wordDefinition}\`\n\n**Orirgin**\n\`${wordOrigin === undefined ? "None given" : wordOrigin}\`\n\n**Example**\n\`${wordExample === undefined ? "None given" : wordExample}\``)
                    //.setImage(xkcdImage)
                    .setURL(`https://www.google.com/search?q=${word}%20definition`)
                    .addFields({
                        name: `Part of Speech`,
                        value: `\`${wordPartOfSpeech === undefined ? "None given" : wordPartOfSpeech}\``,
                        inline: true
                    }, {
                        name: `Phonetic`,
                        value: `\`${wordPhonetic === undefined ? "None given" : wordPhonetic}\``,
                        inline: true
                    })
                message.channel.send({ embeds: [wordEmbed] });
            });

    }
});
