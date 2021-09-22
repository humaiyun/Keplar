const Discord = require("discord.js");
const Command = require("../Structures/Command.js");

module.exports = new Command({
    name: "coinflip",
    description: "Flip a coin!",
    usage: `\`${config.prefix}coinflip\``,
    permission: "SEND_MESSAGES",
    async run(message, args, client) {
        const daCoin = ["HEADS!", "TAILS!"];

        function headsOrTails(coin) {
            return coin[(Math.floor(Math.random() * coin.length))];
        }

        const embed = new Discord.MessageEmbed()
            .setTitle(":coin: You flipped a coin!")
            .setDescription(`You got **${headsOrTails(daCoin)}**`);
        message.channel.send({ embeds: [embed] });
    }
});