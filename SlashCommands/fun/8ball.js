const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    userPermissions: ["SEND_MESSAGES"],
    ...new SlashCommandBuilder()
        .setName("8ball")
        .setDescription("Receive a fortune from the Magic 8-Ball")
        .addStringOption((option) =>
            option
                .setName("question")
                .setDescription("Enter a question that you want a fortune for")
                .setRequired(true)
        ),

    run: async (client, interaction, args) => {

        const fortunes =
            [
                "It is certain.", "It is decidedly so.", "Without a doubt.", "Yes definitely.", "You may rely on it.",
                "As I see it, yes.", "Most likely.", "Outlook good.", "Yes.", "Signs point to yes.",
                "Reply hazy, try again.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.",
                "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good", "Very doubtful."
            ];

        const str = interaction.options.getString("question");

        return interaction.followUp({
            embeds: [new MessageEmbed()
                .setTitle("🎱 Magic 8-Ball")
                .setColor("RANDOM")
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .addFields({
                    name: "Question",
                    value: `\`\`\`${str}\`\`\``,
                    inline: false
                }, {
                    name: "Answer",
                    value: `\`\`\`${fortunes[Math.floor(Math.random() * fortunes.length)]}\`\`\``,
                    inline: false
                })]
            //.setFooter(interaction.member.displayName, interaction.author.displayAvatarURL({ dynamic: true }))]
        });

    },
};
