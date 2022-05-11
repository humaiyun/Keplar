
const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const player = require("../../client/player");

module.exports = {
    userPermissions: ["ADMINISTRATOR"],
    ...new SlashCommandBuilder()
        .setName("seek")
        .setDescription(`Seek to the given time for the current track`)
        .addIntegerOption((option) =>
            option
                .setName("time")
                .setDescription("The time to seek to (in seconds)")
                .setRequired(true)
        ),

    run: async (client, interaction, args) => {
        const queue = player.getQueue(interaction.guildId);

        if (!queue?.playing) {
            return interaction.followUp({
                embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`❌  |  No music is currently being played`)]
            });
        }

        let time = interaction.options.getInteger("time") * 1000;

        if (time < 0) time = 0;
        if (time > queue.current.durationMS) time = queue.current.durationMS - 1;

        console.log(`music/seek.js:34: time: ${time}`)
        await queue.seek(time);

        console.log(`music/seek.js:37: ${interaction.user.tag} seeked to ${time / 1000} seconds for the current track...`);

        return interaction.followUp({
            embeds: [new MessageEmbed()
                .setColor("RED")
                .setDescription(`✅  |  Seeked to ${time / 1000} seconds`)]
        });

    }
};