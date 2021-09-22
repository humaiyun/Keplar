/* https://www.npmjs.com/package/got : npm install got */

const Discord = require("discord.js");
const Command = require("../Structures/Command.js");
const got = require("got");

module.exports = new Command({
    name: "meme",
    description: "Get a random meme from reddit and post it in an embedded format.",
    permission: "SEND_MESSAGES",

    async run(message, args, client) {

        const subreddit = ["memes", "dankmemes", "meirl", "me_irl"];

        got(`https://www.reddit.com/r/${subreddit[Math.floor(Math.random() * subreddit.length)]}/random/.json`, { JSON: true }).then(result => {
            let content = JSON.parse(result.body);
            //console.log(`Title: ${content[0].data.children[0].data.title}\nURL: ${content[0].data.children[0].data.url}\nMisc: 👍 ${content[0].data.children[0].data.ups} 👎 ${content[0].data.children[0].data.downs} | Comments : ${content[0].data.children[0].data.num_comments}`);
            //console.log("meme.js: content[0]: " + content[0].data.children[0].data.title);

            let url1 = content[0].data.children[0].data.url;
            let title1 = content[0].data.children[0].data.title;
            let misc1 = `Misc: 👍 ${content[0].data.children[0].data.ups} 👎 ${content[0].data.children[0].data.downs} | Comments : ${content[0].data.children[0].data.num_comments}`;
            console.log(`\nURL: ${url1}\nTitle: ${title1}\nMisc: ${misc1}`);

            // const post = new Discord.MessageEmbed()
            //     .setTitle(`${content[0].data.children[0].data.title}`)
            //     .setImage(`${content[0].data.children[0].data.url}`)
            //     .setColor("RANDOM")
            //     .setFooter(`👍 ${content[0].data.children[0].data.ups} | 👎 ${content[0].data.children[0].data.downs} | Comments : ${content[0].data.children[0].data.num_comments}`
            //     );
            const helpEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(title1)
                .setImage(url1)
                .setFooter(misc1)
                ;
            message.channel.send({ embeds: [helpEmbed] });


            //message.channel.send({ embeds: post });
            //console.log("meme.js: result.body.url: " + result.body.url);
            //message.channel.send(`URL: ${url1}\nTitle: ${title1}\nMisc: ${misc1}`);
        });





    }
});