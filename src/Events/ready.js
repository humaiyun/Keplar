const Event = require("../Structures/Event.js");
const AsciiTable = require("ascii-table");

module.exports = new Event("ready", client => {
	const table = new AsciiTable();
	table.addRow(`${client.user.tag} has loaded! 🎈`);
	console.log(table.toString());
});