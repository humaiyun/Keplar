
const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const player = require("../../client/player");

module.exports = {
    userPermissions: ["SEND_MESSAGES"],
    ...new SlashCommandBuilder()
        .setName("current-song")
        .setDescription(`Shows information about the current song`),

    run: async (client, interaction, args) => {
        const queue = player.getQueue(interaction.guildId);

        if (!queue?.playing)
            return interaction.followUp({
                embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`❌  |  No music is currently being played`)]
            });

        const progress = queue.createProgressBar();

        return interaction.followUp({
            embeds: [new MessageEmbed()
                .setTitle(`🎶  ${queue.current.title}  🎶`)
                .setImage(`${queue.current.thumbnail}`)
                .setURL(`${queue.current.url}`)
                .setColor("RANDOM") // client.config.clientColor
                .setDescription(`\n\u200b\n🖥  **Uploaded By: ** ${queue.current.author}\n\u200b\n👀  **Views: ** ${queue.current.views.toLocaleString("en-US")}`) //  (\`${percent.progress}%\`) //
                .setFields({
                    name: "\u200b",
                    value: `${progress}`,
                    inline: false
                })
                .setFooter(`Queued by ${queue.current.requestedBy.tag}`, queue.current.requestedBy.displayAvatarURL())
                .setTimestamp()
            ],
        });

    }
};