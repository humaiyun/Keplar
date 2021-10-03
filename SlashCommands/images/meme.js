const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const got = require("got");

module.exports = {
    userPermissions: ["SEND_MESSAGES"],
    ...new SlashCommandBuilder()
        .setName("meme")
        .setDescription("Generate a random meme from Reddit"),

    run: async (client, interaction, args) => {
        const subreddit = ["memes", "dankmemes", "meirl", "me_irl",
            "greentext", "wholesomememes", "2meirl4meirl", "comedyheaven"];
        const randomSub = subreddit[Math.floor(Math.random() * subreddit.length)];

        // Connect to the API and then fetch the data
        got(`https://www.reddit.com/r/${randomSub}/random/.json`, { JSON: true })
            .catch(err => {
                interaction.followUp({
                    embeds: [MessageEmbed()
                        .setAuthor("Error")
                        .setColor("RED")
                        .setDescription(`Something wrong happened... \n\nIf you need help, type \`${config.prefix}help\`\n\n` + `Error Message: \`${err}\``)]
                });
            })
            .then(result => {
                const content = JSON.parse(result.body);

                const redditURL = content[0].data.children[0].data.url;
                const redditTitle = content[0].data.children[0].data.title;
                const subreddit = content[0].data.children[0].data.subreddit;
                const permalink = content[0].data.children[0].data.permalink;
                const author = content[0].data.children[0].data.author;
                const upvotes = `👍  ${content[0].data.children[0].data.ups} `;
                const downvotes = ` |  👎  ${content[0].data.children[0].data.downs} `;
                const comments = ` |  💬  ${content[0].data.children[0].data.num_comments} `;

                interaction.followUp({
                    embeds: [new MessageEmbed()
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
                        .setFooter(upvotes + downvotes + comments)]
                });
            });
    },
};
