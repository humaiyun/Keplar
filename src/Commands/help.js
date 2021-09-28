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

        // string json
        //const allCommands = JSON.stringify(content); //Object.values(content)
        //console.log(allCommands);

        const cmdInput = args.splice(1).join(" ");

        /**
         * Returns an embed with the name, desc, usage, and permissions of the requested command
         * @param {string} name 
         * @param {string} description 
         * @param {string} usage 
         * @param {string} permissions 
         */
        function cmdEmbed(name, description, usage, permissions) {
            const commandEmbed = new Discord.MessageEmbed()
                .setTitle(`${name}`)
                .setColor("RANDOM")
                .setDescription(`**Description**\n\`\`\`${description}\`\`\``)
                .setTimestamp()
                .setFooter(`< required >   |   [ optional ]   •  ${client.user.username}`, client.user.displayAvatarURL())
                .setFields({
                    name: `Usage`,
                    value: `\`\`${usage}\`\``,
                    inline: true
                }, {
                    name: `Permissions`,
                    value: `${permissions == "SEND_MESSAGES" ? "\`\`\`Everybody\`\`\`" : "\`\`\`Administrator\`\`\`"}`,
                    inline: true
                });

            return message.channel.send({ embeds: [commandEmbed] })
        }

        if (!cmdInput || cmdInput == "help") {
            const helpEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor("Command List") //message.author.displayAvatarURL({ dynamic: true })
                .setDescription(`For more information on specific commands, type \`${config.prefix}help [command]\``)
                .setTimestamp()
                .setFooter(`< required >   |   [ optional ]   •  ${client.user.username}`, client.user.displayAvatarURL())
                .addFields({
                    name: ":robot: Bot Version",
                    value: `\`${package.version}\``,
                    inline: true
                }, {
                    name: ":island: Bot Name",
                    value: `\`${client.user.username}\``,
                    inline: true
                }, {
                    name: ":key: Prefix",
                    value: `\`${config.prefix}\``,
                    inline: true
                }, {
                    name: ":nazar_amulet: Information",
                    value: "`help` | `ping` | `stats`",
                    inline: false
                }, {
                    name: ":camera: Images",
                    value: "`meme` | `pokemon` | `xkcd` | `axolotl` | `cat`",
                    inline: false
                }, {
                    name: ":video_game: Fun",
                    value: "`coinflip` | `advice` | `8ball`",
                    inline: false
                }, {
                    name: ":coin: Cryptocurrency",
                    value: "`crypto`",
                    inline: false
                }, {
                    name: ":carousel_horse: Misc.",
                    value: "`ud` | `define`",
                    inline: false
                }, {
                    name: ":wrench: Utility",
                    value: "`clear`",
                    inline: false
                });
            message.channel.send({ embeds: [helpEmbed] });
        }

        else {
            if (cmdInput == "_8ball") {
                const name = `${content._8ball.name}`;
                const description = content._8ball.description;
                const usage = content._8ball.usage;
                const permissions = content._8ball.permission;
                cmdEmbed(name, description, usage, permissions);
            }
            else if (cmdInput == "advice") {
                const name = `${content.advice.name}`;
                const description = content.advice.description;
                const usage = content.advice.usage;
                const permissions = content.advice.permission;
                cmdEmbed(name, description, usage, permissions);
            }
            else if (cmdInput == "axolotl") {
                const name = `${content.axolotl.name}`;
                const description = content.axolotl.description;
                const usage = content.axolotl.usage;
                const permissions = content.axolotl.permission;
                cmdEmbed(name, description, usage, permissions);
            }
            else if (cmdInput == "cat") {
                const name = `${content.cat.name}`;
                const description = content.cat.description;
                const usage = content.cat.usage;
                const permissions = content.cat.permission;
                cmdEmbed(name, description, usage, permissions);
            }
            else if (cmdInput == "clear") {
                const name = `${content.clear.name}`;
                const description = content.clear.description;
                const usage = content.clear.usage;
                const permissions = content.clear.permission;
                cmdEmbed(name, description, usage, permissions);
            }
            else if (cmdInput == "clear") {
                const name = `${content.clear.name}`;
                const description = content.clear.description;
                const usage = content.clear.usage;
                const permissions = content.clear.permission;
                cmdEmbed(name, description, usage, permissions);
            }
            else if (cmdInput == "coinflip") {
                const name = `${content.coinflip.name}`;
                const description = content.coinflip.description;
                const usage = content.coinflip.usage;
                const permissions = content.coinflip.permission;
                cmdEmbed(name, description, usage, permissions);
            }
            else if (cmdInput == "crypto") {
                const name = `${content.crypto.name}`;
                const description = content.crypto.description;
                const usage = content.crypto.usage;
                const permissions = content.crypto.permission;
                cmdEmbed(name, description, usage, permissions);
            }
            else if (cmdInput == "define") {
                const name = `${content.define.name}`;
                const description = content.define.description;
                const usage = content.define.usage;
                const permissions = content.define.permission;
                cmdEmbed(name, description, usage, permissions);
            }
            else if (cmdInput == "meme") {
                const name = `${content.meme.name}`;
                const description = content.meme.description;
                const usage = content.meme.usage;
                const permissions = content.meme.permission;
                cmdEmbed(name, description, usage, permissions);
            }
            else if (cmdInput == "ping") {
                const name = `${content.ping.name}`;
                const description = content.ping.description;
                const usage = content.ping.usage;
                const permissions = content.ping.permission;
                cmdEmbed(name, description, usage, permissions);
            }
            else if (cmdInput == "pokemon") {
                const name = `${content.pokemon.name}`;
                const description = content.pokemon.description;
                const usage = content.pokemon.usage;
                const permissions = content.pokemon.permission;
                cmdEmbed(name, description, usage, permissions);
            }
            else if (cmdInput == "stats") {
                const name = `${content.stats.name}`;
                const description = content.stats.description;
                const usage = content.stats.usage;
                const permissions = content.stats.permission;
                cmdEmbed(name, description, usage, permissions);
            }
            else if (cmdInput == "ud") {
                const name = `${content.ud.name}`;
                const description = content.ud.description;
                const usage = content.ud.usage;
                const permissions = content.ud.permission;
                cmdEmbed(name, description, usage, permissions);
            }
            else if (cmdInput == "xkcd") {
                const name = `${content.xkcd.name}`;
                const description = content.xkcd.description;
                const usage = content.xkcd.usage;
                const permissions = content.xkcd.permission;
                cmdEmbed(name, description, usage, permissions);
            }

            else {
                const throwEmbed = new Discord.MessageEmbed()
                    .setAuthor("Error")
                    .setColor("RED")
                    .setDescription(`If you need help, type \`${config.prefix}help\`\n`);
                message.reply({ embeds: [throwEmbed] });
            }

        }


    }
});