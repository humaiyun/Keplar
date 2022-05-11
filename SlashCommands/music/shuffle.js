
const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const player = require("../../client/player");

module.exports = {
    userPermissions: ["SEND_MESSAGES"],
    ...new SlashCommandBuilder()
        .setName("shuffle")
        .setDescription(`Shuffle the current queue`),

    run: async (client, interaction, args) => {

        const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing) {
            return interaction.followUp({
                embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`❌  |  No music is currently being played`)]
            });
        }

        await queue.shuffle();

        console.log(`\nmusic/shuffle.js:25: ${interaction.user.tag} shuffled the queue...`);

        return interaction.followUp({
            embeds: [new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`✅  |  Queue has been shuffled`)]
        });
    }

};