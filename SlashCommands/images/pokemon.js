const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const got = require("got");

module.exports = {
    userPermissions: ["SEND_MESSAGES"],
    ...new SlashCommandBuilder()
        .setName("pokemon")
        .setDescription("Get the information of a Pokemon. Note: Some Pokemon will not have moves to display")
        .addStringOption((option) =>
            option
                .setName("name")
                .setDescription("Enter the name of the Pokemon")
                .setRequired(false)
        )
        .addIntegerOption((option) =>
            option
                .setName("index")
                .setDescription("Enter the index number of the Pokemon")
                .setRequired(false)
        ),

    run: async (client, interaction, args) => {

        const string = interaction.options.getString('name');
        const integer = interaction.options.getInteger('index');
        const minIndex = 1, maxIndex = 898;

        if (!integer && !string) return getPokemon(randomNumMinToMax(minIndex, maxIndex)); // get random
        if (!integer && string) return getPokemon(string); //get by name

        if (integer && string) { // error if both parameters are inputted
            return interaction.followUp({
                embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`Error: You can't select both options at the same time!`)
                ]
            });
        }

        if (integer && !string) { //get by index
            if (integer < minIndex || integer > maxIndex) {
                return interaction.followUp({
                    embeds: [new MessageEmbed()
                        .setColor("RED")
                        .setDescription(`Invalid index \`${integer}\`\n\nPick a number between \`${minIndex}\` and \`${maxIndex}\``)
                        // .setTimestamp()
                        // .setFooter(client.user.username, client.user.displayAvatarURL())
                    ]
                });
            }
            //pokemonInput = integer;
            return getPokemon(integer);
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

        /**
         * Returns the pokemon information embed
         * @param {String | Integer} pokemonInput 
         * @returns interaction followup embed of the pokemon
         */
        function getPokemon(pokemonInput) {
            // get request the api
            got(`https://pokeapi.co/api/v2/pokemon/${pokemonInput}/`, { JSON: true })
                .catch((err) => {
                    const throwEmbed = new MessageEmbed()
                        //.setAuthor("Error")
                        .setColor("RED")
                        .setTimestamp()
                        .setFooter(client.user.username, client.user.displayAvatarURL())
                        .setDescription(`\`${pokemonInput}\` is an invalid Pokemon name. \n\nError Message: \`${err}\``);
                    interaction.followUp({ embeds: [throwEmbed] });
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

                    const pokeEmbed = new MessageEmbed()
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
                    return interaction.followUp({ embeds: [pokeEmbed] });
                });
        }
    },
};

