const Command = require("../Structures/Command.js");

module.exports = new Command({
    name: "clear",
    description: "Clear an amount of messages.",
    permission: "ADMINISTRATOR",
    async run(message, args, client) {

        const amount = args[1];
        const user = message.author.tag;

        if (!amount || isNaN(amount)) {
            return message.reply(`"${amount == undefined ? "Nothing" : amount}" is not valid -> Specify an amount!`);
        }

        const amountParsed = parseInt(amount);
        if (amountParsed > 75) return message.reply("You cannot clear more than 75 messages!");
        if (amountParsed < 1) return message.reply("You must delete at least 1 message!");

        message.channel.bulkDelete(amountParsed + 1);
        console.log(`\nclear.js: ${user} cleared ${amountParsed} messages...`);

        const msg = await message.channel.send(`Cleared **${amountParsed}** messages!`);
        setTimeout(() => { msg.delete() }, 2500);
    }
});