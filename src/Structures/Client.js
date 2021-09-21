const Discord = require("discord.js");
const Command = require("./Command.js");
const Event = require("./Event.js");
const config = require("../Data/config.json");
const intents = new Discord.Intents(32767);
const fs = require("fs");
const AsciiTable = require("ascii-table");
const { table } = require("console");

// Ascii for Command Handler console logs
const commandsTable = new AsciiTable();
commandsTable.setHeading("Command", "Load Status");

// Ascii for Event Handler console logs
const eventsTable = new AsciiTable();
eventsTable.setHeading("Event", "Load Status");


class Client extends Discord.Client {
	constructor() {
		super({ intents }); //, allowedMentions: { repliedUser: false } - no highlighted replies
		/**
		 * @type {Discord.Collection<string, Command>}
		 */
		this.commands = new Discord.Collection();
		this.prefix = config.prefix;
	}

	start(token) {

		/* Command Handler */
		fs.readdirSync("./src/Commands")
			.filter(file => file.endsWith(".js"))
			.forEach(file => {
				/**
				 * @type {Command}
				 */
				const command = require(`../Commands/${file}`);

				commandsTable.addRow(`${command.name}.js`, '👍');

				//console.log(`Command "${command.name}" loaded`);
				this.commands.set(command.name, command);
			});

		/* Event Handler */
		fs.readdirSync("./src/Events")
			.filter(file => file.endsWith(".js"))
			.forEach(file => {
				/**
				 * @type {Event}
				 */
				const event = require(`../Events/${file}`);

				eventsTable.addRow(`${event.event}.js`, '👍');

				//console.log(`Event "${event.event}" loaded`);
				this.on(event.event, event.run.bind(null, this));
			});

		console.log(commandsTable.toString());
		console.log(eventsTable.toString());
		this.login(token);
	}
}

module.exports = Client;
