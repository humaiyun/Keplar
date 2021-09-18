/* 
 * 18/09/2021 - what da hell do i do the problem is the limit line 27, not sure how to increase the limit without 
 *              deleting over the amount of amountParsed. don't use this for now just stick with clear
 */

const Command = require("../Structures/Command.js");

module.exports = new Command({
    name: "", /*******clearown*************************************************************************************************************************************** */
    description: "Clear an amount of your own messages; including the messages the bot replied to you.",
    permission: "ADMINISTRATOR",
    async run(message, args, client) {

        const amount = args[1];
        const user = message.author.tag;

        if (!amount || isNaN(amount)) {
            return message.reply(`"${amount == undefined ? "Nothing" : amount}" is not valid -> Specify an amount!`);
        }

        const amountParsed = parseInt(amount);
        if (amountParsed > 20) { return message.reply("You cannot clear more than 20 messages!"); }
        if (amountParsed < 1) { return message.reply("You must delete at least 1 message!"); }


        message.channel.messages
            .fetch({ limit: (amountParsed + 1) })
            .then((messages) => {
                const listOfMessages = [];

                messages.filter((m) => m.author.tag === user).forEach((msg) => listOfMessages.push(msg));

                console.log("\nclearown.js: List of messages cleared: [" + listOfMessages.toString() + "]");

                message.channel.bulkDelete(listOfMessages).then(() => {
                    message.channel.send(`Cleared **${amountParsed}** messages!`)
                        .then((msg) => {
                            setTimeout(() => msg.delete(), 2500);
                            listOfMessages.length = 0;
                            console.log(`clearown.js: ${user} cleared ${amountParsed} messages...\n`);
                        });
                });
            });
    }
});