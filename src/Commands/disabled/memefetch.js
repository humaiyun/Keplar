/* https://www.npmjs.com/package/node-fetch : npm install node-fetch */

const Discord = require("discord.js");
const Command = require("../Structures/Command.js");
const fetch = require("node-fetch");

module.exports = new Command({
    name: "",
    description: "Get a random meme from reddit and post it in an embedded format.",
    permission: "SEND_MESSAGES",

    async run(message, args, client) {

        // const subreddit = ["memes", "dankmemes", "meirl", "me_irl"];
        // const random = subreddit[Math.floor(Math.random() * subreddit.length)];

        // fetch(`https://www.reddit.com/r/${random}/random/.json`)
        //     .then(result => result.json())
        //     .then(json => {
        //         console.log("1: " + json[0]);
        //         console.log("2: " + json[1]);
        //     });

    }
});