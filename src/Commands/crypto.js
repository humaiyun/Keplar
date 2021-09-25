/* https://www.coingecko.com/en/api/documentation */

const Discord = require("discord.js");
const Command = require("../Structures/Command.js");
const config = require("../Data/config.json");
const got = require("got");

module.exports = new Command({
    name: "crypto",
    description: "Returns information for cryptocurrencies",
    usage: `\`${config.prefix}crypto <price | p>\``,
    permission: "SEND_MESSAGES",

    async run(message, args, client) {

        const cryptoInput = args.splice(1).join(" ");
        let coinGeckoURL = `https://api.coingecko.com/api/v3/`;

        if (!cryptoInput) { // get info of the top 24 crypto's by market cap
            coinGeckoURL = `${coinGeckoURL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=24&page=1&sparkline=false`;
            got(coinGeckoURL, { JSON: true })
                .catch((err) => {
                    const throwEmbed = new Discord.MessageEmbed()
                        .setAuthor("Error")
                        .setColor("RED")
                        .setDescription(`Error Message: \`${err}\``);
                    message.channel.send({ embeds: [throwEmbed] });
                })
                .then(result => {
                    const content = JSON.parse(result.body);

                    const cryptoName = [];
                    const cryptoSymbol = [];
                    const cryptoPrice = [];
                    const cryptoImage = [];

                    for (let i = 0; i < content.length; i++) {
                        cryptoName.push(content[i].id);
                        cryptoSymbol.push(content[i].symbol);
                        cryptoPrice.push(content[i].current_price);
                        cryptoImage.push(content[i].image);
                    }

                    let embedArr = new Discord.MessageEmbed()
                        .setTitle("Cryptocurrency Details")
                        .setDescription("[Data Provided by CoinGecko](https://www.coingecko.com/en/api/documentation)");

                    for (let j = 0; j < cryptoName.length; j++) {
                        embedArr.addFields({
                            name: `**${cryptoName[j].charAt(0).toUpperCase() + cryptoName[j].slice(1)}**`,
                            value: `\`${cryptoSymbol[j].toUpperCase()}\`  →  \`$${cryptoPrice[j].toString()} USD\``,
                            inline: true
                        });

                    }
                    message.channel.send({ embeds: [embedArr] });

                });
        }
        // else {
        //     if (cryptoInput === "price" || cryptoInput === "p") {
        //         console.log("crypto.js:30: coinGeckoURL: " + coinGeckoURL);
        //     }
        //     else {
        //         // Input validation
        //         if (!isNaN(parseInt(cryptoInput))) {
        //             const invalidEmbed = new Discord.MessageEmbed()
        //                 .setTitle("Error")
        //                 .setColor("RED")
        //                 .setDescription(`isNaN Error: is a number`);
        //             return message.reply({ embeds: [invalidEmbed] });
        //         }
        //         else {
        //             //do something maybe check detailed info per coin
        //         }
        //     }
        // }

    }
});
