const Command = require("../Structures/Command.js");
const config = require("../Data/config.json");
const Discord = require("discord.js");
const package = require("../../package.json");

const requireFolder = require("require-folder");


module.exports = new Command({
    name: "help",
    description: "List of all supported commands",
    usage: `\`${config.prefix}help\``,
    permission: "SEND_MESSAGES",
    async run(message, args, client) {

        const cmd = requireFolder("./src/Commands", { exclude: ["disabled", "help.js"] });

        let cmdInput = args.splice(1).join(" ");

        //console.log(`\n20: Cmd Name: ${cmd.pokemon.name}\nCmd Description: ${cmd.pokemon.description}`);

        if (!cmdInput) {
            const helpEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor("Command List", message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Here are the list of commands!\nFor more info on specific commands, type \`${config.prefix}helpinfo\``)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
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
                    value: "`help` | `helpinfo` | `ping` | `stats`",
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
                    name: ":game_die: Misc.",
                    value: "`ud` | `define`",
                    inline: false
                }, {
                    name: ":wrench: Utility",
                    value: "`clear`",
                    inline: false
                });
            message.channel.send({ embeds: [helpEmbed] });
        }

        // else {
        //     if (cmdInput == "xkcd") {

        //         console.log(specificCommandEmbed(cmd, cmdInput));

        //     }


        // }


    }
});