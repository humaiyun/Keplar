console.clear();
console.log("\n\n\n" + new Date().toUTCString());

const Client = require("./Structures/Client.js");
const config = require("./Data/config.json");
const client = new Client();

process.on('unhandledRejection', (err) => {
    console.log('err' + err)
});

client.start(config.token);
