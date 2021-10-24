
const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const player = require("../../client/player");

module.exports = {
    userPermissions: ["SEND_MESSAGES"],
    ...new SlashCommandBuilder()
        .setName("pause")
        .setDescription(`Pauses the current track`),

    run: async (client, interaction, args) => {
        const queue = player.getQueue(interaction.guildId);
        queue.setPaused(true);

        return interaction.followUp({
            embeds: [new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Paused the current track!`)]
        });
    }
};