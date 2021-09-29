const Event = require("../Structures/Event.js");
const AsciiTable = require("ascii-table");

module.exports = new Event("ready", client => {
	const table = new AsciiTable();
	table.addRow(`${client.user.tag} has loaded! 🎈`);

	// random[Math.floor(Math.random() * random.length)];

	client.user.setActivity("the Bot Olympics", { type: "COMPETING" });

	// client.user.setPresence({
	// 	status: "idle",  // dnd, idle, invisible, online
	// 	name: "!help"
	// });
	console.log(table.toString());
});