const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    userPermissions: ["SEND_MESSAGES"],
    ...new SlashCommandBuilder()
        .setName("stats")
        .setDescription("Displays statistics of the bot"),

    run: async (client, interaction, args) => {
        let totalSeconds = interaction.client.uptime / 1000;
        const days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        const hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);

        const uptime = `\`\`\`${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds\`\`\``;

        const embed = new MessageEmbed()
            .setTitle(`${interaction.client.user.username} Stats`)
            .addFields({
                name: "Servers",
                value: `\`\`\`${client.guilds.cache.size}\`\`\``,
                inline: true
            }, {
                name: "Users",
                value: `\`\`\`${client.users.cache.size}\`\`\``,
                inline: true
            }, {
                name: "Channels",
                value: `\`\`\`${client.channels.cache.size}\`\`\``,
                inline: true
            }, {
                name: "Uptime",
                value: uptime,
                inline: true
            }, {
                name: "Ping",
                value: `\`\`\`${Math.round(interaction.client.ws.ping)} ms\`\`\``,
                inline: true
            }, {
                name: "RAM",
                value: `\`\`\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\`\`\``,
                inline: true
            })
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL());

        interaction.followUp({ embeds: [embed] })
    },
};
