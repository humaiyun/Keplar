const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    userPermissions: ["ADMINISTRATOR"],
    ...new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Clears a specified amount of messages")
        .addIntegerOption((option) =>
            option
                .setName("amount")
                .setDescription("Number of messages you want to clear")
                .setRequired(true)
        ),

    run: async (client, interaction, args) => {

        const amount = interaction.options.getInteger("amount");
        const user = interaction.user.tag;
        //console.log(`amount: ${amount}   user: ${user}`);

        if (amount > 75) {
            return interaction.followUp({
                embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                    .setDescription(`You cannot clear more than \`75\` messages!`)]
            });
        }
        else if (amount < 0) {
            return interaction.followUp({
                embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                    .setDescription(`You must clear at least \`1\` message!`)]
            });
        }


        interaction.channel.bulkDelete(amount + 1);
        console.log(`\nutility/clear.js:48: ${user} cleared ${amount} messages...`);

        const msg = await interaction.channel.send({
            embeds: [new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Cleared \`${amount}\` messages!`)]
        });

        setTimeout(() => { msg.delete() }, 2500);

    },
};
