const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const got = require("got");

module.exports = {
    userPermissions: ["SEND_MESSAGES"],
    ...new SlashCommandBuilder()
        .setName("define")
        .setDescription("Get the dictionary definition of a word")
        .addStringOption((option) =>
            option
                .setName("word")
                .setDescription("Enter a word to get the definition of")
                .setRequired(true)
        ),

    run: async (client, interaction, args) => {

        const str = interaction.options.getString("word");

        if (!isNaN(parseInt(str))) { // is a number
            return interaction.followUp({
                embeds: [new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle("No Definitions Found")
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                    .setDescription(`No definitions have been found for the word you were looking for. \n\nTry the search again or head to the web instead.`)]
            });
        }
        else {
            got(`https://api.dictionaryapi.dev/api/v2/entries/en/${str}`, { JSON: true })
                .catch((err) => {
                    return interaction.followUp({
                        embeds: [new MessageEmbed()
                            .setAuthor("Error")
                            .setColor("RED")
                            .setTimestamp()
                            .setFooter(client.user.username, client.user.displayAvatarURL())
                            .setDescription(`Error Message: \`${err}\``)]
                    });
                })
                .then(result => {
                    const content = JSON.parse(result.body);

                    const wordWord = content[0].word; //.charAt(0).toUpperCase() + wordWord.slice(1)
                    const wordOrigin = content[0].origin;
                    const wordPartOfSpeech = content[0].meanings[0].partOfSpeech;
                    const wordDefinition = content[0].meanings[0].definitions[0].definition;
                    const wordPhonetic = content[0].phonetic;
                    const wordExample = content[0].meanings[0].definitions[0].example;

                    return interaction.followUp({
                        embeds: [new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle(wordWord)
                            .setTimestamp()
                            .setFooter(client.user.username, client.user.displayAvatarURL())
                            .setDescription(`**Definition**\n\`${wordDefinition}\`\n\n**Orirgin**\n\`${wordOrigin === undefined ? "None given" : wordOrigin}\`\n\n**Example**\n\`${wordExample === undefined ? "None given" : wordExample}\``)
                            .setURL(`https://www.google.com/search?q=${str}%20definition`)
                            .addFields({
                                name: `Part of Speech`,
                                value: `\`${wordPartOfSpeech === undefined ? "None given" : wordPartOfSpeech}\``,
                                inline: true
                            }, {
                                name: `Phonetic`,
                                value: `\`${wordPhonetic === undefined ? "None given" : wordPhonetic}\``,
                                inline: true
                            })]
                    });
                });
        }




    },
};
