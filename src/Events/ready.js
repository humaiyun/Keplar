const Event = require("../Structures/Event.js");
const AsciiTable = require("ascii-table");

module.exports = new Event("ready", client => {
	const table = new AsciiTable();
	table.addRow(`${client.user.tag} has loaded! 🎈`);
	client.user.setActivity("Prefix is !", { type: "PLAYING" });
	console.log(table.toString());
});