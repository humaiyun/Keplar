/* https://www.npmjs.com/package/got : npm install got */

const Discord = require("discord.js");
const Command = require("../Structures/Command.js");
const got = require("got");

module.exports = new Command({
    name: "meme",
    description: "Get a random meme from reddit and post it in an embedded format.",
    permission: "SEND_MESSAGES",

    async run(message, args, client) {

        const subreddit = ["memes", "dankmemes", "meirl", "me_irl", "greentext"];
        const randomSub = subreddit[Math.floor(Math.random() * subreddit.length)];

        got(`https://www.reddit.com/r/${randomSub}/random/.json`, { JSON: true }).then(result => {
            const content = JSON.parse(result.body);


            const redditURL = content[0].data.children[0].data.url;
            const redditTitle = content[0].data.children[0].data.title;
            const subreddit = content[0].data.children[0].data.subreddit;
            const permalink = content[0].data.children[0].data.permalink;
            const author = content[0].data.children[0].data.author;
            const upvotes = `👍  ${content[0].data.children[0].data.ups} `;
            const downvotes = ` |  👎  ${content[0].data.children[0].data.downs} `
            const comments = ` |  💬  ${content[0].data.children[0].data.num_comments} `;


            //console.log(`\nReddit URL: ${redditURL} \nPost Title: ${redditTitle} \nUpvotes & Comments: ${upvotes + downvotes + comments} `);

            const helpEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(redditTitle)
                .setImage(redditURL)
                .setURL(`https://www.reddit.com${permalink}`)
                .addFields({
                    name: ":snowman: Subreddit",
                    value: `${subreddit}`,
                    inline: true
                }, {
                    name: ":japanese_goblin: User",
                    value: `${author}`,
                    inline: true
                })
                .setFooter(upvotes + downvotes + comments);

            message.channel.send({ embeds: [helpEmbed] });

        });

    }
});