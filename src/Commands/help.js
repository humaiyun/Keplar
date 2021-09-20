const Command = require("../Structures/Command.js");
const config = require("../Data/config.json");

module.exports = new Command({
    name: "help",
    description: "List of supported commands of this bot",
    permission: "SEND_MESSAGES",
    async run(message, args, client) {
        message.reply("Supported Commands:\n\n" +
            `**${config.prefix}help** - Displays the help menu\n**${config.prefix}ping** - Show bot's ping and round-message delay` +
            `**${config.prefix}botinfo** - Shows bot information\n**${config.prefix}clear <num>** - Clears previous <1 to 75> messages`);
    }
});