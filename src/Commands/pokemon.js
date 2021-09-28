/* https://pokeapi.co/docs/v2 | https://pokeapi.co/docs/v2#pokemon */

const Discord = require("discord.js");
const Command = require("../Structures/Command.js");
const config = require("../Data/config.json");
const got = require("got");

module.exports = new Command({
    name: "pokemon",
    description: "Get the information of a random Pokemon, or a specific Pokemon by it's name or ID.\n\nNote: Some Pokemon will not have moves to display.",
    usage: `\`${config.prefix}pokemon [name | number]\``,
    permission: "SEND_MESSAGES",

    async run(message, args, client) {
        const minIndex = 1, maxIndex = 898;
        function randomNumMinToMax(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        /* Input checking */
        let pokemonInput = args.splice(1).join(" ");
        if (!pokemonInput) {
            pokemonInput = randomNumMinToMax(minIndex, maxIndex);
        }
        else {
            // Input validation
            if (!isNaN(parseInt(pokemonInput))) {
                if (parseInt(pokemonInput) < minIndex || parseInt(pokemonInput) > maxIndex) {
                    const invalidEmbed = new Discord.MessageEmbed()
                        .setTitle("Error")
                        .setColor("RED")
                        .setTimestamp()
                        .setFooter(client.user.username, client.user.displayAvatarURL())
                        .setDescription(`Invalid index \`${pokemonInput}\`\n\nPick a number between \`${minIndex}\` and \`${maxIndex}\``);
                    return message.reply({ embeds: [invalidEmbed] });
                }
                pokemonInput = parseInt(pokemonInput);
            }
        }

        // get request the api
        got(`https://pokeapi.co/api/v2/pokemon/${pokemonInput}/`, { JSON: true })
            .catch((err) => {
                const throwEmbed = new Discord.MessageEmbed()
                    .setAuthor("Error")
                    .setColor("RED")
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                    .setDescription(`\`${pokemonInput}\` is an invalid Pokemon name. \n\nIf you need help, type \`${config.prefix}help pokemon\`\n\n` + `Error Message: \`${err}\``);
                message.channel.send({ embeds: [throwEmbed] });
            })
            .then(result => {
                const content = JSON.parse(result.body);

                const pokemonName = content.name;
                const pokemonType = content.types[0].type.name;
                const pokemonIndex = content.id;
                const pokemonHeight = content.height / 10.0; // height in metres
                const pokemonWeight = content.weight / 10.0; // weight in kg
                const pokemonHP = content.stats[0].base_stat; // base Health
                const pokemonAP = content.stats[1].base_stat; // base Attack
                const pokemonFrontSprite = `${content.sprites.other["official-artwork"].front_default}`; //content.sprites.front_default;
                //const pokemonBackSprite = content.sprites.back_default; Sprite of the back of the pokemon

                let arrayOfMoves = [];
                if (content.moves.length >= 1) {
                    const amountOfMoves = content.moves.length;
                    while (arrayOfMoves.length < 3) { // get 3 moves - change the number to get num amount of moves
                        arrayOfMoves.push(content.moves[randomNumMinToMax(0, amountOfMoves - 1)].move.name);
                    }
                }

                const pokeEmbed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setAuthor(`${pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}`, `${pokemonFrontSprite}`, `https://pokemon.fandom.com/wiki/${pokemonName}`)
                    .setImage(`${pokemonFrontSprite}`)
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                    .setFields({
                        name: "Index",
                        value: `\`\`\`${pokemonIndex}\`\`\``,
                        inline: true
                    }, {
                        name: `Height`,
                        value: `\`\`\`${pokemonHeight} m\`\`\``,
                        inline: true
                    }, {
                        name: "Weight",
                        value: `\`\`\`${pokemonWeight} kg\`\`\``,
                        inline: true
                    }, {
                        name: "Type",
                        value: `\`\`\`${pokemonType}\`\`\``,
                        inline: true
                    }, {
                        name: "Base Health",
                        value: `\`\`\`${pokemonHP}\`\`\``,
                        inline: true
                    }, {
                        name: "Base Attack",
                        value: `\`\`\`${pokemonAP}\`\`\``,
                        inline: true
                    });

                for (let i = 0; i < arrayOfMoves.length; i++) {
                    pokeEmbed.addFields({
                        name: `Move ${i + 1}`,
                        value: `\`\`\`${arrayOfMoves[i] === undefined ? "N/A" : arrayOfMoves[i]}\`\`\``,
                        inline: true
                    });
                }
                message.channel.send({ embeds: [pokeEmbed] });
            });
    }
});
