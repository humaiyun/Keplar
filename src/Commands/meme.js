const Command = require("../Structures/Command.js");

module.exports = new Command({
    name: "meme",
    description: "Get a random meme from reddit.",
    permission: "SEND_MESSAGES",

    async run(message, args, client) {

    }
});