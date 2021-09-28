const Command = require("../Structures/Command.js");
const Discord = require("discord.js");
const config = require("../Data/config.json");

module.exports = new Command({
    name: "clear",
    description: "Clear a specified amount of messages",
    usage: `\`${config.prefix}clear <number>\``,
    permission: "ADMINISTRATOR",
    async run(message, args, client) {

        const amount = args[1];
        const user = message.author.tag;

        if (!amount || isNaN(amount)) {
            const nothingEmbed = new Discord.MessageEmbed()
                .setAuthor("Error")
                .setColor("RED")
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .setDescription(`\`${amount == undefined ? "Nothing" : amount}\` is not a valid amount!`);

            return message.channel.send({ embeds: [nothingEmbed] });
            //return message.reply(`"${amount == undefined ? "Nothing" : amount}" is not valid -> Specify an amount!`);
        }

        const amountParsed = parseInt(amount);
        if (amountParsed > 75) {
            const overLimitEmbed = new Discord.MessageEmbed()
                .setAuthor("Error")
                .setColor("RED")
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .setDescription(`You cannot clear more than \`75\` messages!`);
            return message.channel.send({ embeds: [overLimitEmbed] });
            //return message.reply("You cannot clear more than 75 messages!");
        }


        if (amountParsed < 1) {
            const underLimitEmbed = new Discord.MessageEmbed()
                .setAuthor("Error")
                .setColor("RED")
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .setDescription(`You must clear at least \`1\` message!`);
            return message.channel.send({ embeds: [underLimitEmbed] });
            //return message.reply("You must delete at least 1 message!");
        }

        message.channel.bulkDelete(amountParsed + 1);
        console.log(`\nclear.js:46: ${user} cleared ${amountParsed} messages...`);

        const clearedEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Cleared \`${amountParsed}\` messages!`);

        const msg = await message.channel.send({ embeds: [clearedEmbed] });
        setTimeout(() => { msg.delete() }, 2500);
    }
});