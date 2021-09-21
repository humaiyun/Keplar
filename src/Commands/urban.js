/* https://www.npmjs.com/package/urban-dictionary npm install urban-dictionary */

const Command = require("../Structures/Command.js");
const ud = require('urban-dictionary');

module.exports = new Command({
    name: "urban",
    description: "Search the Urban Dictionary definition of a word.",
    permission: "SEND_MESSAGES",
    async run(message, args, client) {


    }
});