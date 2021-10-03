const { Client, Collection } = require("discord.js");

const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

// Initializing the project
require("./handler")(client);

process.on("unhandledRejection", (err) => {
    console.log("\nindex.js:9: Unhandled Rejection at: ", err);
});

client.login(client.config.token);
