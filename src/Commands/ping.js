const Command = require("../Structures/Command.js");

module.exports = new Command({
	name: "ping",
	description: "Shows the ping of the bot as well as the round-trip ping of the message.",
	permission: "SEND_MESSAGES",
	async run(message, args, client) {
		const msg = await message.reply(`Ping: ${client.ws.ping} ms.`);

		msg.edit(
			`**Ping:** ${client.ws.ping} ms.\n**Message Ping:** ${msg.createdTimestamp - message.createdTimestamp} ms.`
		);
	}
});
