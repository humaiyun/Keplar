const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const got = require("got");

module.exports = {
    userPermissions: ["SEND_MESSAGES"],
    ...new SlashCommandBuilder()
        .setName("xkcd")
        .setDescription("Generate a random xkcd comic, a specific one by number, or the latest one")
        .addIntegerOption((option) =>
            option
                .setName("number")
                .setDescription("Enter the number of the comic you want to retrieve")
                .setRequired(false)
        ).addBooleanOption((option) =>
            option
                .setName("latest")
                .setDescription("If true, returns the latest xkcd comic")
                .setRequired(false)
        ),

    run: async (client, interaction, args) => {
        const number = interaction.options.getInteger('number');
        const latest = interaction.options.getBoolean('latest');
        const minIndex = 1, maxIndex = 2523; //max as of 01 oct 2021
        //let comicNumber;
        let xkcdURL = ``;


        // no options - random
        if (!number && !latest) {
            //comicNumber = randomNumMinToMax(minIndex, maxIndex);
            //xkcdURL = `https://xkcd.com/${randomNumMinToMax(minIndex, maxIndex)}/info.0.json`;
            return getComic(`https://xkcd.com/${randomNumMinToMax(minIndex, maxIndex)}/info.0.json`);
        }

        // latest
        if (!number && latest) {
            //comicNumber = maxIndex;
            //xkcdURL = `https://xkcd.com/info.0.json`;
            return getComic(`https://xkcd.com/info.0.json`);
        }

        // number - specific 
        if (number && !latest) {
            if (number < minIndex || number > maxIndex) {
                return interaction.followUp({
                    embeds: [new MessageEmbed()
                        .setColor("RED")
                        .setDescription(`Invalid index \`${number}\`\n\nPick a number between \`${minIndex}\` and \`${maxIndex}\``)
                        // .setTimestamp()
                        // .setFooter(client.user.username, client.user.displayAvatarURL())
                    ]
                });
            }
            //comicNumber = parseInt(number);
            //xkcdURL = ;
            return getComic(`https://xkcd.com/${parseInt(number)}/info.0.json`);
        }

        // both - error
        if (number && latest) {
            return interaction.followUp({
                embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`Error: You can't select both options at the same time!`)]
            });
        }

        /**
         * Fetches the xkcd API and returns an embedded follow up
         * @param {Link | URL} xkcdURL - the link/url for the comic
         * @returns embedded message
         */
        function getComic(xkcdURL) {
            got(xkcdURL, { JSON: true })
                .catch((err) => {
                    return interaction.followUp({
                        embeds: [new MessageEmbed()
                            .setColor("RED")
                            .setTimestamp()
                            .setFooter(client.user.username, client.user.displayAvatarURL())
                            .setDescription(`Error Message: \`${err}\``)]
                    });
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

                    const xkcdEmbed = new MessageEmbed()
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
                    return interaction.followUp({ embeds: [xkcdEmbed] });
                });
        }

        /**
         * Returns a random number between the min and max values (always assumes correct input)
         * @param {Integer} min - minimum index number
         * @param {Integer} max - maximum index number
         * @returns random number
         */
        function randomNumMinToMax(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

    },
};
