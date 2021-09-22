const Discord = require("discord.js");
const Client = require("./Client.js");

/**
 * @param {Discord.Message} message // | Discord.Interaction
 * @param {string[]} args
 * @param {Client} client
 */
function RunFunction(message, args, client) { }

class Command {
	/**
	 * @typedef {{name: string, description: string, usage: string, permission: Discord.PermissionString, run: RunFunction}} CommandOptions
	 * @param {CommandOptions} options
	 */
	constructor(options) {
		this.name = options.name;
		this.description = options.description;
		this.usage = options.usage; // 22/Sept/2021 7:34pm (ctrl+f and remove that -> usage: string)
		this.permission = options.permission;
		this.run = options.run;
	}
}

module.exports = Command;
