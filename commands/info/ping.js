const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "",
    aliases: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const pingEmbed = new MessageEmbed()
            .setFields({ name: ":satellite: **Ping**", value: `\`\`\`${client.ws.ping} ms\`\`\`` })
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL());
        message.channel.send({ embeds: [pingEmbed] });
    },
};
