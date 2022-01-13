
const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const player = require("../../client/player");
const got = require("got");

module.exports = {
    userPermissions: ["SEND_MESSAGES"],
    ...new SlashCommandBuilder()
        .setName("lyrics")
        .setDescription(`Get the lyrics for a specific song`)
        .addStringOption((option) =>
            option
                .setName("title")
                .setDescription("Enter the title of the song you want lyrics for")
                .setRequired(true)
        ),

    run: async (client, interaction, args) => {
        let song = interaction.options.getString('title');
        song = song.replace(" ", "%20");
        if (!song) {
            return interaction.followUp({
                embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`❌  |  Please provide a song to search for!`)]
            })
        }

        got(`https://some-random-api.ml/lyrics?title=${song}`, { JSON: true })
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

                const author = content.author;
                const title = content.title;
                const lyrics = content.lyrics;
                const thumbnail = content.thumbnail.genius;
                const link = content.links.genius;

                console.log(`\nlyrics.js:50: \`${author} - ${title}\` lyrics length: ${content.lyrics.length}`);

                if (lyrics.length > 4096) {
                    return interaction.followUp({
                        embeds: [new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle(`${author}  -  ${title}`)
                            .setImage(thumbnail)
                            .setURL(link)
                            .setDescription(`Lyrics are too long to show.`)
                            .setTimestamp()
                            .setFooter(client.user.username, client.user.displayAvatarURL())]
                    });
                }

                interaction.followUp({
                    embeds: [new MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle(`${author}  -  ${title}`)
                        .setImage(thumbnail)
                        .setURL(link)
                        .setDescription(`📄  **Lyrics**\n\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n${lyrics}`)
                        .setTimestamp()
                        .setFooter(client.user.username, client.user.displayAvatarURL())]
                });
            })

    }
};
