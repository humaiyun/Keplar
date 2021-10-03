const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const urban = require('relevant-urban');
const got = require("got");

module.exports = {
    userPermissions: ["SEND_MESSAGES"],
    ...new SlashCommandBuilder()
        .setName("ud")
        .setDescription("Get the top Urban Dictionary definition of a word or sentence")
        .addStringOption((option) =>
            option
                .setName("word")
                .setDescription("Enter a word or sentence to get the definition of")
                .setRequired(true)
        ),

    run: async (client, interaction, args) => {

        const word = interaction.options.getString("word");

        const definition = await urban(word).catch(err => {
            interaction.followUp({
                embeds: [new MessageEmbed()
                    //.setAuthor("Error")
                    .setColor("RED")
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                    .setDescription(`A definition for "${word}" could not be found. \n\nIf you need help, type \`${config.prefix}help\`\n\n` + `Error Message: \`${err}\``)]
            });
        })
        const defEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`${definition.word}`)
            .setURL(definition.urbanURL)
            .addFields({
                name: ":notebook_with_decorative_cover:  Definition",
                value: `\`${definition.definition}\`\n` ? `\`${definition.definition}\`\n` : "\`No description found...\`",
                inline: false
            }, {
                name: ":bookmark:  Example",
                value: `\`${definition.example}\`\n` ? `\`${definition.example}\`\n` : "\`No example found...\`",
                inline: false
            }, {
                name: ":writing_hand:  Author",
                value: `\`${definition.author}\`\n` ? `\`${definition.author}\`\n` : "\`No author found...\`",
                inline: true
            }, {
                name: "Rating",
                value: `:thumbsup:     \`${definition.thumbsUp}\`     |     :thumbsdown:     \`${definition.thumbsDown}\` \n`,
                inline: true
            })
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL());

        interaction.followUp({ embeds: [defEmbed] });

    },
};
