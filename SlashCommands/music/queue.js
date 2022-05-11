
const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const player = require("../../client/player");

module.exports = {
    userPermissions: ["SEND_MESSAGES"],
    ...new SlashCommandBuilder()
        .setName("queue")
        .setDescription(`Shows the queue`),

    run: async (client, interaction, args) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing)
            return interaction.followUp({
                embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`❌  |  The queue is empty!`)]
            });

        const currentTrack = queue.current;
        const tracks = queue.tracks.slice(0, 10).map((m, i) => {
            return `${i + 1}. [**${m.title}**](${m.url}) - ${m.requestedBy.tag}`;
        });

        return interaction.followUp({
            embeds: [new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("📃  Queue")
                .setDescription(`${tracks.join("\n")}${queue.tracks.length > tracks.length
                    ? `\n...${queue.tracks.length - tracks.length === 1
                        ? `${queue.tracks.length - tracks.length
                        } more track`
                        : `${queue.tracks.length - tracks.length
                        } more tracks`
                    }`
                    : ""
                    }`)
                .setFields({
                    name: `Now Playing`,
                    value: `🎶 | [**${currentTrack.title}**](${currentTrack.url}) - \`${currentTrack.requestedBy.tag}\``,
                    inline: false
                })
            ]
        });

    }
};