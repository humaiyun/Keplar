const Event = require("../Structures/Event.js");
const Discord = require("discord.js");
const config = require("../Data/config.json");

module.exports = new Event("messageCreate", (client, message) => {
	if (message.author.bot) return;

	if (!message.content.startsWith(client.prefix)) return;

	const args = message.content.substring(client.prefix.length).split(/ +/);

	const command = client.commands.find(cmd => cmd.name == args[0]);

	//if (!command) return message.reply(`${args[0]} is not a valid command!`);

	if (!command) {
		const invalidEmbed = new Discord.MessageEmbed()
			.setAuthor("Error")
			.setColor("RED")
			.setDescription(`\`${args[0]}\` is not a valid command! For a list of all supported commands type \`${config.prefix}help\``);
		return message.reply({ embeds: [invalidEmbed] });
	}

	const permission = message.member.permissions.has(command.permission, true);

	if (!permission) return message.reply(`You do not have the "${command.permission}" permission to run this command!`);

	// if(command && args[1] == ) {

	// }

	command.run(message, args, client);
});