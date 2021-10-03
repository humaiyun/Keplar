/* https://en.wikipedia.org/wiki/Magic_8-Ball */
const config = require("../Data/config.json");
const Discord = require("discord.js");
const Command = require("../Structures/Command.js");
const got = require("got");

module.exports = new Command({
    name: "_8ball",
    description: "Receive a fortune from the Magic 8-Ball",
    usage: `\`${config.prefix}_8ball <sentence | question>\``,
    permission: "SEND_MESSAGES",

    async run(message, args, client) {

        const fortunes =
            [
                "It is certain.", "It is decidedly so.", "Without a doubt.", "Yes definitely.", "You may rely on it.",
                "As I see it, yes.", "Most likely.", "Outlook good.", "Yes.", "Signs point to yes.",
                "Reply hazy, try again.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.",
                "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good", "Very doubtful."
            ];


        const questionInput = args.splice(1).join(" ");

        if (!questionInput) {
            const invalidEmbed = new Discord.MessageEmbed()
                //.setTitle("Error")
                .setColor("RED")
                // .setTimestamp()
                // .setFooter(client.user.username, client.user.displayAvatarURL())
                .setDescription(`Provide the Magic 8-Ball a question to ask`);
            return message.reply({ embeds: [invalidEmbed] });
        }


        const fortuneEmbed = new Discord.MessageEmbed()
            .setTitle("🎱 Magic 8-Ball")
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .addFields({
                name: "Question",
                value: `\`\`\`${questionInput}\`\`\``,
                inline: false
            }, {
                name: "Answer",
                value: `\`\`\`${fortunes[Math.floor(Math.random() * fortunes.length)]}\`\`\``,
                inline: false
            })
            .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))

        return message.channel.send({ embeds: [fortuneEmbed] });

    }
});