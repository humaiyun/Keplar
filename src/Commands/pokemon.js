/* https://pokeapi.co/docs/v2 | https://pokeapi.co/docs/v2#pokemon */

const Discord = require("discord.js");
const Command = require("../Structures/Command.js");
const config = require("../Data/config.json");
const got = require("got");

module.exports = new Command({
    name: "pokemon",
    description: "Get info of a Pokemon by it's name or ID.",
    permission: "SEND_MESSAGES",

    async run(message, args, client) {
        const minIndex = 1, maxIndex = 898;
        function randomNumMinToMax(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        /* Input checking */
        let pokemonInput = args.splice(1).join(" ");
        if (!pokemonInput) {
            // ********************** Create an embed for this later
            return message.reply(`You must specify a Pokemon!\nExample: \`${config.prefix}pokemon pikachu\` or \`${config.prefix}pokemon 25\``);
        }
        // Random Pokemon
        if (pokemonInput === "random" || pokemonInput === "rnd" || pokemonInput === "rand" || pokemonInput === "-r") {
            pokemonInput = randomNumMinToMax(minIndex, maxIndex);
            console.log(`pokemon.js:28: Pokemon Index: ${pokemonInput}`);
        }
        // Input validation
        if (!isNaN(parseInt(pokemonInput))) { // Check if pokemon is a number
            if (parseInt(pokemonInput) < minIndex || parseInt(pokemonInput) > maxIndex) {
                const invalidEmbed = new Discord.MessageEmbed()
                    .setDescription(`Invalid index!\nPick between \`${minIndex}\` and \`${maxIndex}\``);
                return message.reply({ embeds: [invalidEmbed] });
            }
            pokemonInput = parseInt(pokemonInput);
            //console.log("pokemon.js: Pokemon is a number: " + pokemonInput);
        } else {
            /* pokemonInput is a string so probably nothing: REMOVE this if nothing */
            //console.log("pokemon.js: Pokemon is a string: " + pokemonInput);
        }


        // get request the api
        got(`https://pokeapi.co/api/v2/pokemon/${pokemonInput}/`, { JSON: true })
            .catch((err) => {
                const throwEmbed = new Discord.MessageEmbed()
                    .setAuthor("Error")
                    .setColor("RED")
                    .setDescription(`"${pokemonInput}" is an invalid Pokemon name. If you need help, type \`${config.prefix}help pokemon\`\n\n` + `\`${err}\``);

                message.reply({ embeds: [throwEmbed] });
            })
            .then(result => {
                const content = JSON.parse(result.body);

                const pokemonName = content.name;
                const pokemonType = content.types[0].type.name;
                const pokemonIndex = content.id;
                const pokemonHeight = content.height / 10.0; // height in metres
                const pokemonWeight = content.weight / 10.0; // weight in kg
                const pokemonFrontSprite = content.sprites.front_default; //content.sprites.other.official_artwork.front_default
                //const pokemonBackSprite = content.sprites.back_default;

                const amountOfMoves = content.moves.length;
                let arrayOfMoves = [];
                while (arrayOfMoves.length < 4) { // get 4 moves
                    arrayOfMoves.push(content.moves[randomNumMinToMax(0, amountOfMoves - 1)].move.name);
                }

                const pokeEmbed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setAuthor(`Pokemon #${pokemonIndex}`, `${pokemonFrontSprite}`, `https://pokemon.fandom.com/wiki/${pokemonName}`)
                    .setImage(`${pokemonFrontSprite}`)
                    .setFields({
                        name: "Name",
                        value: `\`${pokemonName}\``,
                        inline: true
                    }, {
                        name: "Type",
                        value: `\`${pokemonType}\``,
                        inline: true
                    }, {
                        name: "Index",
                        value: `\`#${pokemonIndex}\``,
                        inline: true
                    }, {
                        name: "Height",
                        value: `\`${pokemonHeight} m\``,
                        inline: true
                    }, {
                        name: "Weight",
                        value: `\`${pokemonWeight} kg\``,
                        inline: true
                    });

                message.channel.send({ embeds: [pokeEmbed] });

                // console.log(`\nName: ${pokemonName} \nType: ${pokemonType} \n#: ${pokemonIndex} \nAmt of moves: ${amountOfMoves}
                // ${arrayOfMoves.length} Random Moves: ${arrayOfMoves.toString()} \nHeight: ${pokemonHeight}m \nWeight: ${pokemonWeight}kg \nFront: ${pokemonFrontSprite}`); //// \nBack: ${pokemonBackSprite}
            });
    }
});
