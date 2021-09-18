const Event = require("../Structures/Event.js");

module.exports = new Event("ready", client => {
	console.log(`Bot "${client.user.tag}" is ready!`);
});