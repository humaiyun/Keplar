const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const got = require("got");

module.exports = {
    userPermissions: ["SEND_MESSAGES"],
    ...new SlashCommandBuilder()
        .setName("cat")
        .setDescription("Generate a random image of a cat"),

    run: async (client, interaction, args) => {
        got("https://api.thecatapi.com/v1/images/search", { JSON: true })
            .catch((err) => {
                interaction.followUp({
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
                const catImg = content[0].url;
                interaction.followUp({
                    embeds: [new MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle(`\u200b:smiley_cat:`)
                        .setImage(catImg)
                        .setTimestamp()
                        .setFooter(client.user.username, client.user.displayAvatarURL())]
                });
            })

    },
};
