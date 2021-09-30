const Command = require("../Structures/Command.js");
const config = require("../Data/config.json");
const Discord = require("discord.js");
const package = require("../../package.json");
const paginationEmbed = require('discordjs-button-pagination');

const requireFolder = require("require-folder");
const content = requireFolder("./src/Commands", { exclude: ["disabled", "help.js"] });

module.exports = new Command({
    name: "help",
    description: "List of all supported commands",
    usage: `\`${config.prefix}help\``,
    permission: "SEND_MESSAGES",
    async run(message, args, client) {

        // string json
        //const allCommands = JSON.stringify(content); //Object.values(content)
        //console.log(allCommands);

        const cmdInput = args.splice(1).join(" ");

        // /**
        //  * Returns an embed with the name, desc, usage, and permissions of the requested command
        //  * @param {string} name 
        //  * @param {string} description 
        //  * @param {string} usage 
        //  * @param {string} permissions 
        //  */
        // function cmdEmbed(name, description, usage, permissions) {
        //     const commandEmbed = new Discord.MessageEmbed()
        //         .setTitle(`${name}`)
        //         .setColor("RANDOM")
        //         .setDescription(`**Description**\n\`\`\`${description}\`\`\``)
        //         .setTimestamp()
        //         .setFooter(`< required >   |   [ optional ]   •  ${client.user.username}`, client.user.displayAvatarURL())
        //         .setFields({
        //             name: `Usage`,
        //             value: `\`\`${usage}\`\``,
        //             inline: true
        //         }, {
        //             name: `Permissions`,
        //             value: `${permissions == "SEND_MESSAGES" ? "\`\`\`Everybody\`\`\`" : "\`\`\`Administrator\`\`\`"}`,
        //             inline: true
        //         });
        //     return message.channel.send({ embeds: [commandEmbed] })
        // }

        if (!cmdInput || cmdInput == "help") {
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
                .setDescription("**Legend: **  :black_large_square:  < \`required\` >  :black_large_square:  [ \`optional\` ]  :black_large_square:  ")
                // .setDescription(`\`\`\`help\`\`\`\n**Description:  **\`List of all supported commands\`\n**Usage:  **\`${config.prefix}help\`\n**Permissions:  **\`Everybody\`
                // \n\`\`\`${content.ping.name}\`\`\`\n**Description:  **\`${content.ping.description}\`\n**Usage:  **\`${content.ping.usage}\`\n**Permissions:  **\`${content.ping.permission == "SEND_MESSAGES" ? "Everybody" : "Administrator"}\`
                // \n\`\`\`${content.stats.name}\`\`\`\n**Description:  **\`${content.stats.description}\`\n**Usage:  **\`${content.stats.usage}\`\n**Permissions:  **\`${content.stats.permission == "SEND_MESSAGES" ? "Everybody" : "Administrator"}\`
                // `)
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
                .setDescription("**Legend: **  :black_large_square:  < \`required\` >  :black_large_square:  [ \`optional\` ]  :black_large_square:  ")
                .setFields({
                    name: `\`\`\`${content.crypto.name}\`\`\``,
                    value: `**Description:  **\`${content.crypto.description}\`\n**Usage:  **\`${content.crypto.usage}\`\n**Permissions:  **\`${content.crypto.permission == "SEND_MESSAGES" ? "Everybody" : "Administrator"}\`\n\u200b`,
                    inline: false
                });
            const misc = new Discord.MessageEmbed()
                .setTitle(":carousel_horse: Misc")
                .setColor("RANDOM")
                .setDescription("**Legend: **  :black_large_square:  < \`required\` >  :black_large_square:  [ \`optional\` ]  :black_large_square:  ")
                .setFields({
                    name: `\`\`\`${content.ud.name}\`\`\``,
                    value: `**Description:  **\`${content.ud.description}\`\n**Usage:  **\`${content.ud.usage}\`\n**Permissions:  **\`${content.ud.permission == "SEND_MESSAGES" ? "Everybody" : "Administrator"}\`\n\u200b`,
                    inline: false
                }, {
                    name: `\`\`\`${content.define.name}\`\`\``,
                    value: `**Description:  **\`${content.define.description}\`\n**Usage:  **\`${content.define.usage}\`\n**Permissions:  **\`${content.define.permission == "SEND_MESSAGES" ? "Everybody" : "Administrator"}\`\n\u200b`,
                    inline: false
                });
            const utility = new Discord.MessageEmbed()
                .setTitle(":wrench: Utility")
                .setColor("RANDOM")
                .setDescription("**Legend: **  :black_large_square:  < \`required\` >  :black_large_square:  [ \`optional\` ]  :black_large_square:  ")
                .setFields({
                    name: `\`\`\`${content.clear.name}\`\`\``,
                    value: `**Description:  **\`${content.clear.description}\`\n**Usage:  **\`${content.clear.usage}\`\n**Permissions:  **\`${content.clear.permission == "SEND_MESSAGES" ? "Everybody" : "Administrator"}\`\n\u200b`,
                    inline: false
                });
            const pages = [helpEmbed, information, images, fun, cryptocurrency, misc, utility]

            const button1 = new Discord.MessageButton().setCustomId("help_previous").setEmoji('<:neox_leftarrow:877767124544782368>').setStyle("PRIMARY").setDisabled(false); //.setLabel("Previous")
            const button2 = new Discord.MessageButton().setCustomId("help_next").setEmoji('<:neox_rightarrow:877765155230994482>').setStyle("PRIMARY").setDisabled(false); //.setLabel("Next")

            const m = paginationEmbed(message, pages, [button1, button2], 120000);







            //message.channel.send({ embeds: [helpEmbed] });
        }

        // else {
        //     if (cmdInput == "_8ball") {
        //         const name = `${content._8ball.name}`;
        //         const description = content._8ball.description;
        //         const usage = content._8ball.usage;
        //         const permissions = content._8ball.permission;
        //         cmdEmbed(name, description, usage, permissions);
        //     }
        //     else if (cmdInput == "advice") {
        //         const name = `${content.advice.name}`;
        //         const description = content.advice.description;
        //         const usage = content.advice.usage;
        //         const permissions = content.advice.permission;
        //         cmdEmbed(name, description, usage, permissions);
        //     }
        //     else if (cmdInput == "axolotl") {
        //         const name = `${content.axolotl.name}`;
        //         const description = content.axolotl.description;
        //         const usage = content.axolotl.usage;
        //         const permissions = content.axolotl.permission;
        //         cmdEmbed(name, description, usage, permissions);
        //     }
        //     else if (cmdInput == "cat") {
        //         const name = `${content.cat.name}`;
        //         const description = content.cat.description;
        //         const usage = content.cat.usage;
        //         const permissions = content.cat.permission;
        //         cmdEmbed(name, description, usage, permissions);
        //     }
        //     else if (cmdInput == "clear") {
        //         const name = `${content.clear.name}`;
        //         const description = content.clear.description;
        //         const usage = content.clear.usage;
        //         const permissions = content.clear.permission;
        //         cmdEmbed(name, description, usage, permissions);
        //     }
        //     else if (cmdInput == "clear") {
        //         const name = `${content.clear.name}`;
        //         const description = content.clear.description;
        //         const usage = content.clear.usage;
        //         const permissions = content.clear.permission;
        //         cmdEmbed(name, description, usage, permissions);
        //     }
        //     else if (cmdInput == "coinflip") {
        //         const name = `${content.coinflip.name}`;
        //         const description = content.coinflip.description;
        //         const usage = content.coinflip.usage;
        //         const permissions = content.coinflip.permission;
        //         cmdEmbed(name, description, usage, permissions);
        //     }
        //     else if (cmdInput == "crypto") {
        //         const name = `${content.crypto.name}`;
        //         const description = content.crypto.description;
        //         const usage = content.crypto.usage;
        //         const permissions = content.crypto.permission;
        //         cmdEmbed(name, description, usage, permissions);
        //     }
        //     else if (cmdInput == "define") {
        //         const name = `${content.define.name}`;
        //         const description = content.define.description;
        //         const usage = content.define.usage;
        //         const permissions = content.define.permission;
        //         cmdEmbed(name, description, usage, permissions);
        //     }
        //     else if (cmdInput == "meme") {
        //         const name = `${content.meme.name}`;
        //         const description = content.meme.description;
        //         const usage = content.meme.usage;
        //         const permissions = content.meme.permission;
        //         cmdEmbed(name, description, usage, permissions);
        //     }
        //     else if (cmdInput == "ping") {
        //         const name = `${content.ping.name}`;
        //         const description = content.ping.description;
        //         const usage = content.ping.usage;
        //         const permissions = content.ping.permission;
        //         cmdEmbed(name, description, usage, permissions);
        //     }
        //     else if (cmdInput == "pokemon") {
        //         const name = `${content.pokemon.name}`;
        //         const description = content.pokemon.description;
        //         const usage = content.pokemon.usage;
        //         const permissions = content.pokemon.permission;
        //         cmdEmbed(name, description, usage, permissions);
        //     }
        //     else if (cmdInput == "stats") {
        //         const name = `${content.stats.name}`;
        //         const description = content.stats.description;
        //         const usage = content.stats.usage;
        //         const permissions = content.stats.permission;
        //         cmdEmbed(name, description, usage, permissions);
        //     }
        //     else if (cmdInput == "ud") {
        //         const name = `${content.ud.name}`;
        //         const description = content.ud.description;
        //         const usage = content.ud.usage;
        //         const permissions = content.ud.permission;
        //         cmdEmbed(name, description, usage, permissions);
        //     }
        //     else if (cmdInput == "xkcd") {
        //         const name = `${content.xkcd.name}`;
        //         const description = content.xkcd.description;
        //         const usage = content.xkcd.usage;
        //         const permissions = content.xkcd.permission;
        //         cmdEmbed(name, description, usage, permissions);
        //     }

        //     else {
        //         const throwEmbed = new Discord.MessageEmbed()
        //             .setAuthor("Error")
        //             .setColor("RED")
        //             .setDescription(`If you need help, type \`${config.prefix}help\`\n`);
        //         message.reply({ embeds: [throwEmbed] });
        //     }

        // }


    }
});