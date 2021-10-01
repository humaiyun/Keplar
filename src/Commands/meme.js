/* https://www.npmjs.com/package/got : npm install got */

const Discord = require("discord.js");
const Command = require("../Structures/Command.js");
const got = require("got");
const config = require("../Data/config.json");

module.exports = new Command({
    name: "meme",
    description: "Generate a random meme from Reddit",
    usage: `\`${config.prefix}meme\``,
    permission: "SEND_MESSAGES",

    async run(message, args, client) {
        const subreddit = ["memes", "dankmemes", "meirl", "me_irl", "greentext", "wholesomememes"];
        const randomSub = subreddit[Math.floor(Math.random() * subreddit.length)];

        // Connect to the API and then fetch the data
        got(`https://www.reddit.com/r/${randomSub}/random/.json`, { JSON: true })
            .catch(err => {
                const throwEmbed = new Discord.MessageEmbed()
                    .setAuthor("Error")
                    .setColor("RED")
                    .setDescription(`Something wrong happened... \n\nIf you need help, type \`${config.prefix}help\`\n\n` + `Error Message: \`${err}\``);
                message.reply({ embeds: [throwEmbed] });
            })
            .then(result => {
                const content = JSON.parse(result.body);

                //console.log(content);

                const redditURL = content[0].data.children[0].data.url;
                const redditTitle = content[0].data.children[0].data.title;
                const subreddit = content[0].data.children[0].data.subreddit;
                const permalink = content[0].data.children[0].data.permalink;
                const author = content[0].data.children[0].data.author;
                const upvotes = `👍  ${content[0].data.children[0].data.ups} `;
                const downvotes = ` |  👎  ${content[0].data.children[0].data.downs} `;
                const comments = ` |  💬  ${content[0].data.children[0].data.num_comments} `;

                //console.log(`\nReddit URL: ${redditURL} \nPost Title: ${redditTitle} \nUpvotes & Comments: ${upvotes + downvotes + comments} `);
                const memeEmbed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(redditTitle)
                    .setImage(redditURL)
                    .setURL(`https://www.reddit.com${permalink}`)
                    .addFields({
                        name: ":snowman:   Subreddit",
                        value: `${subreddit}`,
                        inline: true
                    }, {
                        name: ":japanese_goblin:   User",
                        value: `${author}`,
                        inline: true
                    })
                    .setTimestamp()
                    .setFooter(upvotes + downvotes + comments);
                message.channel.send({ embeds: [memeEmbed] });
            });
    }
});