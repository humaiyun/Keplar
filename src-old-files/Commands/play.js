const Command = require("../Structures/Command.js");
const config = require("../Data/config.json");
const Discord = require("discord.js");

const ytdl = require("ytdl-core");
const ytSearch = require('yt-search');


const queue = new Map();



module.exports = new Command({
    name: "play",
    description: "Play music in a voice channel.",
    usage: `\`${config.prefix}play\``,
    permission: "SEND_MESSAGES",
    async run(message, args, client) {





    }


});
