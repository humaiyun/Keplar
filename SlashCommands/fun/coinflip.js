const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    userPermissions: ["SEND_MESSAGES"],
    ...new SlashCommandBuilder()
        .setName("coinflip")
        .setDescription("Flip a coin"),

    run: async (client, interaction, args) => {

        const daCoin = ["HEADS!", "TAILS!"];

        function headsOrTails(coin) {
            return coin[(Math.floor(Math.random() * coin.length))];
        }
        interaction.followUp({
            embeds: [new MessageEmbed()
                .setTitle(`You got **\`${headsOrTails(daCoin)}\`** :coin:`)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())]
        });

    },
};
