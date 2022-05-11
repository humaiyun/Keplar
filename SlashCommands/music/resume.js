
const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const player = require("../../client/player");

module.exports = {
    userPermissions: ["SEND_MESSAGES"],
    ...new SlashCommandBuilder()
        .setName("resume")
        .setDescription(`Resumes the current track`),

    run: async (client, interaction, args) => {
        const queue = player.getQueue(interaction.guildId);

        if (!queue?.playing) {
            return interaction.followUp({
                embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`❌  |  No music is currently being played`)]
            });
        }

        queue.setPaused(false);

        console.log(`\nmusic/resume.js:25: ${interaction.user.tag} resumed the current track...`);

        return interaction.followUp({
            embeds: [new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`✅  |  Resumed the current track`)]
        });
    }
};