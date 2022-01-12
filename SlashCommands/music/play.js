/* https://github.com/Androz2091/discord-player/issues/794#issue-1000772967 */
const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { QueryType } = require("discord-player");
const player = require("../../client/player");

module.exports = {
    userPermissions: ["SEND_MESSAGES"],
    ...new SlashCommandBuilder()
        .setName("play")
        .setDescription(`Play a song`)
        .addStringOption((option) =>
            option
                .setName("song")
                .setDescription("Enter the name or YouTube link of the song you want to play")
                .setRequired(true)
        ),
    run: async (client, interaction, args) => {
        const songTitle = interaction.options.getString("song");

        // Check if user is in voice channel
        if (!interaction.member.voice.channel)
            return interaction.followUp({
                embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`❌  |  You must be in a voice channel to use this command!`)]
            });

        // Search the song query
        const searchResult = await player.search(songTitle, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO,
        });

        // Create a queue
        const queue = await player.createQueue(interaction.guild, {
            metadata: interaction.channel,
        });

        // Connect to voice channel that the requested user is in
        if (!queue.connection) {
            await queue.connect(interaction.member.voice.channel);
        }

        interaction.followUp({
            embeds: [new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`✅  |  Added "\`${songTitle}\`" to the queue`)]
        });
        console.log(`\nmusic/play.js:50: ${interaction.user.tag} added ${songTitle} to the queue...`);

        // Add tracks to queue
        searchResult.playlist
            ? queue.addTracks(searchResult.tracks)
            : queue.addTrack(searchResult.tracks[0]);

        if (!queue.playing) await queue.play();

    }


};