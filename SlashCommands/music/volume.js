
const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const player = require("../../client/player");

module.exports = {
    userPermissions: ["SEND_MESSAGES"],
    ...new SlashCommandBuilder()
        .setName("volume")
        .setDescription(`Adjusts the volume of the bot`)
        .addIntegerOption((option) =>
            option
                .setName("percentage")
                .setDescription("Enter the percentage you want to change the volume to")
                .setRequired(false)
        ),
    run: async (client, interaction, args) => {
        const volumePercentage = interaction.options.getInteger("percentage");
        const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing)
            return interaction.followUp({
                embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`❌  |  No music is currently being played`)]
            });

        if (!volumePercentage) {
            return interaction.followUp({
                embeds: [new MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`The current volume is \`${queue.volume}%\``)]
            });
        }

        if (volumePercentage < 0 || volumePercentage > 100)
            return interaction.followUp({
                embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`❌  |  The volume must be between 1 and 100`)]
            });

        queue.setVolume(volumePercentage);

        return interaction.followUp({
            embeds: [new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`✅  |  Volume has been set to \`${volumePercentage}%\``)]
        });

    }
};