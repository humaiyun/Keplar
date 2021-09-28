/* https://xkcd.com/json.html */

const Discord = require("discord.js");
const Command = require("../Structures/Command.js");
const config = require("../Data/config.json");
const got = require("got");

module.exports = new Command({
    name: "xkcd",
    description: `Generate a random xkcd comic, or a specific one by number.\n\nNote: For the latest comic, use ${config.prefix}xkcd [latest | l]`,
    usage: `\`${config.prefix}xkcd [number | latest | l]\``,
    permission: "SEND_MESSAGES",

    async run(message, args, client) {

        function randomNumMinToMax(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        const minIndex = 1, maxIndex = 2519; //max as of 23 sept 2021

        /* Input checking */
        let comicNumber = args.splice(1).join(" ");
        let xkcdURL = ``;


        if (!comicNumber) {
            comicNumber = randomNumMinToMax(minIndex, maxIndex);
            //console.log(`xkcd.js:26: Comic Number: ${comicNumber}`);
            xkcdURL = `https://xkcd.com/${comicNumber}/info.0.json`;
        }
        else {
            // Get latest comic
            if (comicNumber === "latest" || comicNumber === "l") {
                comicNumber = maxIndex;
                xkcdURL = `https://xkcd.com/info.0.json`;
                //console.log(`xkcd.js:31: Comic Number: ${comicNumber}`);
            }
            else {
                // Input validation
                if (!isNaN(parseInt(comicNumber))) {
                    if (parseInt(comicNumber) < minIndex || parseInt(comicNumber) > maxIndex) {
                        const invalidEmbed = new Discord.MessageEmbed()
                            .setTitle("Error")
                            .setColor("RED")
                            .setTimestamp()
                            .setFooter(client.user.username, client.user.displayAvatarURL())
                            .setDescription(`Invalid index \`${comicNumber}\`\n\nPick a number between \`${minIndex}\` and \`${maxIndex}\``);
                        return message.reply({ embeds: [invalidEmbed] });
                    }
                    comicNumber = parseInt(comicNumber);
                    xkcdURL = `https://xkcd.com/${comicNumber}/info.0.json`;
                    //console.log(`xkcd.js:42: Comic Number: ${comicNumber}`);
                }
                else {
                    const invalidEmbed = new Discord.MessageEmbed()
                        .setTitle("Error")
                        .setColor("RED")
                        .setTimestamp()
                        .setFooter(client.user.username, client.user.displayAvatarURL())
                        .setDescription(`Invalid index \`${comicNumber}\`\n\nPick a number between \`${minIndex}\` and \`${maxIndex}\``);
                    return message.reply({ embeds: [invalidEmbed] });
                }
            }
        }
        //console.log(`\nxkcd.js:62: xkcdURL: ${xkcdURL}`);

        got(xkcdURL, { JSON: true })
            .catch((err) => {
                const throwEmbed = new Discord.MessageEmbed()
                    .setAuthor("Error")
                    .setColor("RED")
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                    .setDescription(`Error Message: \`${err}\``);
                message.channel.send({ embeds: [throwEmbed] });
            })
            .then(result => {
                const content = JSON.parse(result.body);

                const xkcdNum = content.num;
                const xkcdTitle = content.safe_title;
                const xkcdImage = content.img;
                const xkcdYear = content.year;
                const xkcdMonth = content.month;
                const xkcdDay = content.day;
                const xkcdAlt = content.alt;

                const xkcdEmbed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(xkcdTitle)
                    .setDescription(`${xkcdAlt}\n`)
                    .setImage(xkcdImage)
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                    .setURL(`https://xkcd.com/${xkcdNum}/`)
                    .addFields({
                        name: `Comic Number`,
                        value: `\`${xkcdNum}\``,
                        inline: true
                    }, {
                        name: `Date Released`,
                        value: `\`${xkcdYear} - ${xkcdMonth} - ${xkcdDay}\``,
                        inline: true
                    })
                message.channel.send({ embeds: [xkcdEmbed] });
            });
    }
});
