/* https://www.npmjs.com/package/axios : npm install axios */

const Discord = require("discord.js");
const Command = require("../Structures/Command.js");
const https = require("https");

module.exports = new Command({
    name: "",
    description: "Get a random meme from reddit and post it in an embedded format.",
    permission: "SEND_MESSAGES",

    async run(message, args, client) {
        const subreddit = ["memes", "dankmemes", "meirl", "me_irl"];
        const random = subreddit[Math.floor(Math.random() * subreddit.length)];

        https.get(`https://www.reddit.com/r/${random}/random/.json`, (result) => {
            let body = "";

            result.on("title", (chunk) => {
                body += chunk;
            });
            result.on("url", (chunk) => {
                body += chunk;
            });
            result.on("downs", (chunk) => {
                body += chunk;
            });
            result.on("ups", (chunk) => {
                body += chunk;
            });
            result.on("num_comments", (chunk) => {
                body += chunk;
            });
            result.on("end", () => {
                const data = Buffer.concat(body);
                console.log("memehttps.js: " + JSON.parse(data).explanation);
            })


            // try {

            // }
            // catch (err) {
            //     console.log("memehttps.js: " + err);
            // }


        });


        console.log("memehttps.js: " + random);



    }
});