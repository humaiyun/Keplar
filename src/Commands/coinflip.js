const Discord = require("discord.js");
const Command = require("../Structures/Command.js");
const config = require("../Data/config.json");

module.exports = new Command({
    name: "coinflip",
    description: "Flip a coin",
    usage: `\`${config.prefix}coinflip\``,
    permission: "SEND_MESSAGES",
    async run(message, args, client) {
        const daCoin = ["HEADS!", "TAILS!"];

        function headsOrTails(coin) {
            return coin[(Math.floor(Math.random() * coin.length))];
        }

        const embed = new Discord.MessageEmbed()
            .setTitle(`You got **\`${headsOrTails(daCoin)}\`** :coin:`)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        //.setDescription(`You got **\`${headsOrTails(daCoin)}\`**`);
        message.channel.send({ embeds: [embed] });
    }
});