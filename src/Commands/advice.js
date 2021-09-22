/* https://api.adviceslip.com/ ADVICE SLIP JSON API */

const Discord = require("discord.js");
const Command = require("../Structures/Command.js");
const got = require("got");

module.exports = new Command({
    name: "advice",
    description: "Generate a random piece of advice to put you at ease, or fill you in with guilt and regret.",
    permission: "SEND_MESSAGES",

    async run(message, args, client) {

        // Connect to the API and then fetch the data
        try {
            got('https://api.adviceslip.com/advice', { JSON: true }).then(result => {
                const content = JSON.parse(result.body);

                const advice = content.slip.advice;

                const adviceEmbed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(advice);

                message.channel.send({ embeds: [adviceEmbed] });
            });
        }
        catch (err) {
            message.channel.send("Error: " + err + "\n@Nemo#1259");
            console.log("\advice.js: " + err);
        }
    }
});