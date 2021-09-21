/* https://www.npmjs.com/package/urban-dictionary npm install urban-dictionary */

const Command = require("../Structures/Command.js");
const ud = require('relevant-urban');

module.exports = new Command({
    name: "ud",
    description: "Search the Urban Dictionary definition of a word.",
    permission: "SEND_MESSAGES",
    async run(message, args, client) {


    }
});