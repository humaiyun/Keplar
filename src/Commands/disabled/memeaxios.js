/* https://www.npmjs.com/package/axios : npm install axios */

const Discord = require("discord.js");
const Command = require("../Structures/Command.js");
const axios = require("axios");

module.exports = new Command({
    name: "",
    description: "Get a random meme from reddit and post it in an embedded format.",
    permission: "SEND_MESSAGES",

    async run(message, args, client) {
        const subreddit = ["memes", "dankmemes", "meirl", "me_irl"];
        const random = subreddit[Math.floor(Math.random() * subreddit.length)];

        axios.get(`https://www.reddit.com/r/${random}/random/.json`).then((result) => {
            let content = JSON.parse(result.body);

            console.log(content.data.url);
            console.log();
            console.log();
            console.log();
            //console.log(content[0].data.children[0].data.url);



            // const redditJSON = JSON.parse(result.body);
            // console.log(redditJSON);
        });

        //console.log("memeaxios.js: " + random);

    }
});