const Command = require("../Structures/Command.js");

module.exports = new Command({
    name: "clear",
    description: "Clear an amount of messages.",
    permission: "SEND_MESSAGES",
    async run(message, args, client) {
        const amount = args[1];
        if(!amount || isNaN(amount)) { 
            return message.reply(`"${amount == undefined ? "Nothing" : amount}" is not a valid number!`); 
        }
        
        const amountParsed = parseInt(amount);
        if(amountParsed > 50) { 
            return message.reply("You cannot clear more than 50 messages!"); 
        }

        message.channel.bulkDelete(amountParsed);
        const msg = await message.channel.send(`Cleared ${amountParsed} messages!`)
        setTimeout(() => msg.delete(), 10000);
    }
});