const Command = require("../Structures/Command.js");
const Discord = require("discord.js");
const config = require("../Data/config.json");

module.exports = new Command({
	name: "ping",
	description: "Shows the ping of the bot",
	usage: `\`${config.prefix}ping\``,
	permission: "SEND_MESSAGES",
	async run(message, args, client) {

		const pingEmbed = new Discord.MessageEmbed().setDescription(`:satellite: **Ping:** ${client.ws.ping} ms`);
		message.channel.send({ embeds: [pingEmbed] });

		// const newEmbed = new Discord.MessageEmbed(message.embeds[0])
		// 	.setDescription(`:satellite: Ping: ${client.ws.ping} ms.\n:incoming_envelope: Round Trip: ${msg.createdTimestamp - message.createdTimestamp} ms.`);
		// message.edit({ embeds: [newEmbed] });

		// .then(msg => {
		// 	const newEmbed = new Discord.MessageEmbed()
		// .setFields({
		// 	name: ":satellite: Ping",
		// 	value: `${client.ws.ping} ms.`,
		// 	inline: true
		// }, {
		// 	name: ":incoming_envelope: Round Trip",
		// 	value: `${msg.createdTimestamp - message.createdTimestamp} ms.`,
		// 	inline: true
		// })
		// 	msg.edit(newEmbed);
		// });


		// const msg = await message.reply(`Ping:  ms.`);

		// msg.edit(
		// 	`**Ping:** ${client.ws.ping} ms.\n**Message Ping:** ${msg.createdTimestamp - message.createdTimestamp} ms.`
		// );



	}
});
