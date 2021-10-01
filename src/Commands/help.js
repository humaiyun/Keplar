const Command = require("../Structures/Command.js");
const config = require("../Data/config.json");
const Discord = require("discord.js");
const package = require("../../package.json");

const requireFolder = require("require-folder");
const content = requireFolder("./src/Commands", { exclude: ["disabled", "help.js"] });

module.exports = new Command({
    name: "help",
    description: "List of all supported commands",
    usage: `\`${config.prefix}help\``,
    permission: "SEND_MESSAGES",
    async run(message, args, client) {

        /**
         * Creates a pagination embed
         * @param {Discord.Client} client - the discord bot
         * @param {Discord.Message} msg - the user message
         * @param {Discord.MessageEmbed[]} pages - the array of embeds to turn into pages
         * @param {Discord.MessageButton[]} buttonList - the buttons
         * @param {number | integer} timeout - timeout (default 120000; 2 minutes)
         * @returns
         */
        const paginationEmbed = async (client, msg, pages, buttonList, timeout = 120000) => {
            if (!msg && !msg.channel) throw new Error("Channel is inaccessible.");
            if (!pages) throw new Error("Pages are not given.");
            if (!buttonList) throw new Error("Buttons are not given.");
            if (buttonList[0].style === "LINK" || buttonList[1].style === "LINK")
                throw new Error(
                    "Link buttons are not supported"
                );
            if (buttonList.length !== 2) throw new Error("Need two buttons.");

            let page = 0;

            const row = new Discord.MessageActionRow().addComponents(buttonList);
            const curPage = await msg.channel.send({
                embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}  •  ${client.user.username}`, client.user.displayAvatarURL())], //`Page ${page + 1} / ${pages.length} ${client.user.username}`, client.user.displayAvatarURL()
                components: [row],
            });

            const filter = (i) => i.customId === buttonList[0].customId || i.customId === buttonList[1].customId;

            const collector = await curPage.createMessageComponentCollector({
                filter,
                time: timeout,
            });

            collector.on("collect", async (i) => {
                switch (i.customId) {
                    case buttonList[0].customId:
                        page = page > 0 ? --page : pages.length - 1;
                        break;
                    case buttonList[1].customId:
                        page = page + 1 < pages.length ? ++page : 0;
                        break;
                    default:
                        break;
                }
                await i.deferUpdate();
                await i.editReply({
                    embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}  •  ${client.user.username}`, client.user.displayAvatarURL())], //`Page ${page + 1} / ${pages.length}`
                    components: [row],
                });
                collector.resetTimer();
            });

            collector.on("end", () => {
                if (!curPage.deleted) {
                    const disabledRow = new Discord.MessageActionRow().addComponents(
                        buttonList[0].setDisabled(true),
                        buttonList[1].setDisabled(true)
                    );
                    curPage.edit({
                        embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}  •  ${client.user.username}`, client.user.displayAvatarURL())], //`Page ${page + 1} / ${pages.length}`
                        components: [disabledRow],
                    });
                }
            });
            // const iFilter = i => i.user.id === msg.author.id;
            // const iCollector = curPage.createMessageComponentCollector({ filter: iFilter, time: timeout });
            // iCollector.on('collect', async i => {
            //     if (i.customId === buttonList[0].customId) {
            //         i.reply({ content: "LEFT", ephemeral: true });
            //     }
            //     else if (i.customId === buttonList[1].customId) {
            //         i.reply({ content: "RIGHT", ephemeral: true });
            //     }
            // });

            return curPage;
        }

        const helpEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor("Full Command List", message.author.displayAvatarURL({ dynamic: true })) //message.author.displayAvatarURL({ dynamic: true })
            .setDescription(`For more information on specific commands, click the buttons to navigate to it's respective page\n\n**Note:** The buttons expire after 2 minutes\n\n`)
            .setTimestamp()
            //.setFooter(`< required >   |   [ optional ]   •  ${client.user.username}`, client.user.displayAvatarURL())
            .addFields({
                name: "\u200b",
                value: ":one:   **Bot Information**",
                inline: false
            }, {
                name: ":robot:   Version",
                value: `\`${package.version}\``,
                inline: true
            }, {
                name: ":name_badge:   Name",
                value: `\`${client.user.username}\``,
                inline: true
            }, {
                name: ":key:   Prefix ",
                value: `\`${config.prefix}\``,
                inline: true
            }, {
                name: "\u200b",
                value: "**Table of Contents**",
                inline: false
            }, {
                name: ":two:  Information",
                value: "`help`  `ping`  `stats`",
                inline: false
            }, {
                name: ":three:  Images",
                value: "`meme`  `pokemon`  `xkcd`  `axolotl`  `cat`",
                inline: false
            }, {
                name: ":four:  Fun",
                value: "`coinflip`  `advice`  `_8ball`",
                inline: false
            }, {
                name: ":five:  Cryptocurrency",
                value: "`crypto`",
                inline: false
            }, {
                name: ":six:  Misc.",
                value: "`ud`  `define`",
                inline: false
            }, {
                name: ":seven:  Utility",
                value: "`clear`",
                inline: false
            });

        const information = new Discord.MessageEmbed()
            .setTitle(":nazar_amulet: Information")
            .setColor("RANDOM")
            .setTimestamp()
            .setDescription("**Legend: **  :black_large_square:  < \`required\` >  :black_large_square:  [ \`optional\` ]  :black_large_square:  ")
            .setFields({
                name: `\`\`\`help\`\`\``,
                value: `**Description:  **\`List of all supported commands\`\n**Usage:  **\`${config.prefix}help\`\n**Permissions:  **\`Everybody\`\n\u200b`,
                inline: false
            }, {
                name: `\`\`\`${content.ping.name}\`\`\``,
                value: `**Description:  **\`${content.ping.description}\`\n**Usage:  **\`${content.ping.usage}\`\n**Permissions:  **\`${content.ping.permission == "SEND_MESSAGES" ? "Everybody" : "Administrator"}\`\n\u200b`,
                inline: false
            }, {
                name: `\`\`\`${content.stats.name}\`\`\``,
                value: `**Description:  **\`${content.stats.description}\`\n**Usage:  **\`${content.stats.usage}\`\n**Permissions:  **\`${content.stats.permission == "SEND_MESSAGES" ? "Everybody" : "Administrator"}\``,
                inline: false
            });
        const images = new Discord.MessageEmbed()
            .setTitle(":camera: Images")
            .setColor("RANDOM")
            .setTimestamp()
            .setDescription("**Legend: **  :black_large_square:  < \`required\` >  :black_large_square:  [ \`optional\` ]  :black_large_square:  ")
            .setFields({
                name: `\`\`\`${content.meme.name}\`\`\``,
                value: `**Description:  **\`${content.meme.description}\`\n**Usage:  **\`${content.meme.usage}\`\n**Permissions:  **\`${content.meme.permission == "SEND_MESSAGES" ? "Everybody" : "Administrator"}\`\n\u200b`,
                inline: false
            }, {
                name: `\`\`\`${content.pokemon.name}\`\`\``,
                value: `**Description:  **\`${content.pokemon.description}\`\n**Usage:  **\`${content.pokemon.usage}\`\n**Permissions:  **\`${content.pokemon.permission == "SEND_MESSAGES" ? "Everybody" : "Administrator"}\`\n\u200b`,
                inline: false
            }, {
                name: `\`\`\`${content.xkcd.name}\`\`\``,
                value: `**Description:  **\`${content.xkcd.description}\`\n**Usage:  **\`${content.xkcd.usage}\`\n**Permissions:  **\`${content.xkcd.permission == "SEND_MESSAGES" ? "Everybody" : "Administrator"}\`\n\u200b`,
                inline: false
            }, {
                name: `\`\`\`${content.axolotl.name}\`\`\``,
                value: `**Description:  **\`${content.axolotl.description}\`\n**Usage:  **\`${content.axolotl.usage}\`\n**Permissions:  **\`${content.axolotl.permission == "SEND_MESSAGES" ? "Everybody" : "Administrator"}\`\n\u200b`,
                inline: false
            }, {
                name: `\`\`\`${content.cat.name}\`\`\``,
                value: `**Description:  **\`${content.cat.description}\`\n**Usage:  **\`${content.cat.usage}\`\n**Permissions:  **\`${content.cat.permission == "SEND_MESSAGES" ? "Everybody" : "Administrator"}\``,
                inline: false
            });
        const fun = new Discord.MessageEmbed()
            .setTitle(":video_game: Fun")
            .setColor("RANDOM")
            .setTimestamp()
            .setDescription("**Legend: **  :black_large_square:  < \`required\` >  :black_large_square:  [ \`optional\` ]  :black_large_square:  ")
            .setFields({
                name: `\`\`\`${content.coinflip.name}\`\`\``,
                value: `**Description:  **\`${content.coinflip.description}\`\n**Usage:  **\`${content.coinflip.usage}\`\n**Permissions:  **\`${content.coinflip.permission == "SEND_MESSAGES" ? "Everybody" : "Administrator"}\`\n\u200b`,
                inline: false
            }, {
                name: `\`\`\`${content.advice.name}\`\`\``,
                value: `**Description:  **\`${content.advice.description}\`\n**Usage:  **\`${content.advice.usage}\`\n**Permissions:  **\`${content.advice.permission == "SEND_MESSAGES" ? "Everybody" : "Administrator"}\`\n\u200b`,
                inline: false
            }, {
                name: `\`\`\`${content._8ball.name}\`\`\``,
                value: `**Description:  **\`${content._8ball.description}\`\n**Usage:  **\`${content._8ball.usage}\`\n**Permissions:  **\`${content._8ball.permission == "SEND_MESSAGES" ? "Everybody" : "Administrator"}\``,
                inline: false
            });
        const cryptocurrency = new Discord.MessageEmbed()
            .setTitle(":coin: Cryptocurrency")
            .setColor("RANDOM")
            .setTimestamp()
            .setDescription("**Legend: **  :black_large_square:  < \`required\` >  :black_large_square:  [ \`optional\` ]  :black_large_square:  ")
            .setFields({
                name: `\`\`\`${content.crypto.name}\`\`\``,
                value: `**Description:  **\`${content.crypto.description}\`\n\u200b\n**Usage:  **\`${content.crypto.usage}\`\n**Permissions:  **\`${content.crypto.permission == "SEND_MESSAGES" ? "Everybody" : "Administrator"}\``,
                inline: false
            });
        const misc = new Discord.MessageEmbed()
            .setTitle(":carousel_horse: Misc")
            .setColor("RANDOM")
            .setTimestamp()
            .setDescription("**Legend: **  :black_large_square:  < \`required\` >  :black_large_square:  [ \`optional\` ]  :black_large_square:  ")
            .setFields({
                name: `\`\`\`${content.ud.name}\`\`\``,
                value: `**Description:  **\`${content.ud.description}\`\n**Usage:  **\`${content.ud.usage}\`\n**Permissions:  **\`${content.ud.permission == "SEND_MESSAGES" ? "Everybody" : "Administrator"}\`\n\u200b`,
                inline: false
            }, {
                name: `\`\`\`${content.define.name}\`\`\``,
                value: `**Description:  **\`${content.define.description}\`\n**Usage:  **\`${content.define.usage}\`\n**Permissions:  **\`${content.define.permission == "SEND_MESSAGES" ? "Everybody" : "Administrator"}\``,
                inline: false
            });
        const utility = new Discord.MessageEmbed()
            .setTitle(":wrench: Utility")
            .setColor("RANDOM")
            .setTimestamp()
            .setDescription("**Legend: **  :black_large_square:  < \`required\` >  :black_large_square:  [ \`optional\` ]  :black_large_square:  ")
            .setFields({
                name: `\`\`\`${content.clear.name}\`\`\``,
                value: `**Description:  **\`${content.clear.description}\`\n**Usage:  **\`${content.clear.usage}\`\n**Permissions:  **\`${content.clear.permission == "SEND_MESSAGES" ? "Everybody" : "Administrator"}\``,
                inline: false
            });
        const pages = [helpEmbed, information, images, fun, cryptocurrency, misc, utility]

        const button1 = new Discord.MessageButton().setCustomId("help_previous").setEmoji('<:neox_leftarrow:877767124544782368>').setStyle("PRIMARY").setDisabled(false); //.setLabel("Previous")
        const button2 = new Discord.MessageButton().setCustomId("help_next").setEmoji('<:neox_rightarrow:877765155230994482>').setStyle("PRIMARY").setDisabled(false); //.setLabel("Next")

        const m = paginationEmbed(client, message, pages, [button1, button2], 120000);




    }
});