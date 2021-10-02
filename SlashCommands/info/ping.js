const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    // name: "ping",
    // description: "Displays the ping of the bot",
    // type: 'CHAT_INPUT',
    userPermissions: ["SEND_MESSAGES"],
    ...new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Displays the ping of the bot"),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const pingEmbed = new MessageEmbed()
            .setFields({ name: ":satellite: **Ping**", value: `\`\`\`${client.ws.ping} ms\`\`\`` })
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL());
        interaction.followUp({ embeds: [pingEmbed] });
    },
};
