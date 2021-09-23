/* https://pokeapi.co/docs/v2 | https://pokeapi.co/docs/v2#pokemon */

const Discord = require("discord.js");
const Command = require("../Structures/Command.js");
const config = require("../Data/config.json");
const got = require("got");

module.exports = new Command({
    name: "pokemon",
    description: "Get info of a Pokemon by it's name or ID.",
    usage: `\`${config.prefix}pokemon <name | index number>\` | \`${config.prefix}pokemon <random | rand | rnd | -r | r>\``,
    permission: "SEND_MESSAGES",

    async run(message, args, client) {
        const minIndex = 1, maxIndex = 898;
        function randomNumMinToMax(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        /* Input checking */
        let pokemonInput = args.splice(1).join(" ");
        if (!pokemonInput) {
            const invalidInputEmbed = new Discord.MessageEmbed()
                .setTitle("Error")
                .setColor("RED")
                .setDescription(`You must specify a Pokemon! \n\nExample: \`${config.prefix}pokemon pikachu\` or \`${config.prefix}pokemon 25\` or \`${config.prefix}pokemon r\` for a random Pokemon\n\nIf you need help, type \`${config.prefix}helpinfo\``);
            return message.reply({ embeds: [invalidInputEmbed] });
        }
        // Get Random Pokemon
        if (pokemonInput === "random" || pokemonInput === "rnd" || pokemonInput === "rand" || pokemonInput === "-r" || pokemonInput === "r") {
            pokemonInput = randomNumMinToMax(minIndex, maxIndex);
            //console.log(`pokemon.js:32: Pokemon Index: ${pokemonInput}`);
        }
        // Input validation
        if (!isNaN(parseInt(pokemonInput))) { // Check if pokemon is a number
            if (parseInt(pokemonInput) < minIndex || parseInt(pokemonInput) > maxIndex) {
                const invalidEmbed = new Discord.MessageEmbed()
                    .setTitle("Error")
                    .setColor("RED")
                    .setDescription(`Invalid index \`${pokemonInput}\`\n\nPick between \`${minIndex}\` and \`${maxIndex}\``);
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
                    .setDescription(`\`${pokemonInput}\` is an invalid Pokemon name. \n\nIf you need help, type \`${config.prefix}helpinfo\`\n\n` + `Error Message: \`${err}\``);
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
                    .setFields({
                        name: "Index",
                        value: `\`${pokemonIndex}\``,
                        inline: true
                    }, {
                        name: `Height`,
                        value: `\`${pokemonHeight} m\``,
                        inline: true
                    }, {
                        name: "Weight",
                        value: `\`${pokemonWeight} kg\``,
                        inline: true
                    }, {
                        name: "Type",
                        value: `\`${pokemonType}\``,
                        inline: true
                    }, {
                        name: "Base Health",
                        value: `\`${pokemonHP}\``,
                        inline: true
                    }, {
                        name: "Base Attack",
                        value: `\`${pokemonAP}\``,
                        inline: true
                    }, {
                        name: "Move 1",
                        value: `\`${arrayOfMoves[0] === undefined ? "N/A" : arrayOfMoves[0]}\``,
                        inline: true
                    }, {
                        name: "Move 2",
                        value: `\`${arrayOfMoves[1] === undefined ? "N/A" : arrayOfMoves[1]}\``,
                        inline: true
                    }, {
                        name: "Move 3",
                        value: `\`${arrayOfMoves[2] === undefined ? "N/A" : arrayOfMoves[2]}\``,
                        inline: true
                    });


                message.channel.send({ embeds: [pokeEmbed] });
                // {
                //     name: "Name",
                //     value: `\`${pokemonName}\``,
                //     inline: true
                // }, 
                //console.log("pokemon.js:110: Base HP: " + pokemonHP);
                // console.log(`\nName: ${pokemonName} \nType: ${pokemonType} \n#: ${pokemonIndex} \nAmt of moves: ${amountOfMoves}
                // ${arrayOfMoves.length} Random Moves: ${arrayOfMoves.toString()} \nHeight: ${pokemonHeight}m \nWeight: ${pokemonWeight}kg \nFront: ${pokemonFrontSprite}`); //// \nBack: ${pokemonBackSprite}
            });
    }
});
