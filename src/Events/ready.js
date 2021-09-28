const Event = require("../Structures/Event.js");
const AsciiTable = require("ascii-table");

module.exports = new Event("ready", client => {
	const table = new AsciiTable();
	table.addRow(`${client.user.tag} has loaded! 🎈`);
	client.user.setActivity("joe mama.", { type: "WATCHING" });
	// client.user.setPresence({
	// 	status: "idle",  // dnd, idle, invisible, online
	// 	name: "!help"
	// });
	console.log(table.toString());
});