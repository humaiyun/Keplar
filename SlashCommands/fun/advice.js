const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const got = require("got");

module.exports = {
    userPermissions: ["SEND_MESSAGES"],
    ...new SlashCommandBuilder()
        .setName("advice")
        .setDescription("Generate a random piece of advice"),

    run: async (client, interaction, args) => {

        got('https://api.adviceslip.com/advice', { JSON: true })
            .catch(err => {
                interaction.followUp({
                    embeds: [new MessageEmbed()
                        .setColor("RED")
                        .setDescription(`If you need help, type \`${config.prefix}help\`\n\n` + `\`${err}\``)]
                });
            })
            .then(result => {
                const content = JSON.parse(result.body);
                const advice = content.slip.advice;
                interaction.followUp({
                    embeds: [new MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription(advice)]
                });
            });

    },
};
