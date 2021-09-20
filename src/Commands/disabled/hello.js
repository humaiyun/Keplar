const Command = require("../Structures/Command.js");

module.exports = new Command({
	name: "",
	description: "Make the bot say hello back.",
	permission: "SEND_MESSAGES",
	async run(message, args, client) {
		message.reply("Hello!");
	}
});