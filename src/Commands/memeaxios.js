/* https://www.npmjs.com/package/axios : npm install axios */

const Discord = require("discord.js");
const Command = require("../Structures/Command.js");
const got = require("got");

module.exports = new Command({
    name: "memeaxios",
    description: "Get a random meme from reddit and post it in an embedded format.",
    permission: "SEND_MESSAGES",

    async run(message, args, client) {

        const subreddit = ["memes", "dankmemes", "meirl", "me_irl"];

        got(`https://www.reddit.com/r/${subreddit[Math.floor(Math.random() * subreddit.length)]}/random/.json`).then(result => {
            let content = JSON.parse(result.body);
            console.log(`Title: ${content[0].data.children[0].data.title}\nURL: ${content[0].data.children[0].data.url}\nMisc: 👍 ${content[0].data.children[0].data.ups} 👎 ${content[0].data.children[0].data.downs} | Comments : ${content[0].data.children[0].data.num_comments}`);
            //console.log("meme.js: content[0]: " + content[0].data.children[0].data.title);

            const post = new Discord.MessageEmbed()
                .setTitle(`${content[0].data.children[0].data.title}`)
                .setImage(`${content[0].data.children[0].data.url}`)
                .setColor("RANDOM")
                .setFooter(`👍 ${content[0].data.children[0].data.ups} | 👎 ${content[0].data.children[0].data.downs} | Comments : ${content[0].data.children[0].data.num_comments}`);


            message.channel.send({ embeds: post });


        });
    }
});