/* https://www.coingecko.com/en/api/documentation */

const Discord = require("discord.js");
const Command = require("../Structures/Command.js");
const config = require("../Data/config.json");
const got = require("got");

module.exports = new Command({
    name: "crypto",
    description: "Get the latest market information for various cryptocurrencies. This command supports the top 200 cryptocurrency by market cap.\n\nData provided by CoinGecko",
    usage: `\`${config.prefix}crypto [name | symbol | list]\``,
    permission: "SEND_MESSAGES",

    async run(message, args, client) {
        const cryptoInput = args.splice(1).join(" ").toLowerCase();
        let coinGeckoURL = `https://api.coingecko.com/api/v3/`;

        /**
         * Get detailed info of a specific cryptocurrency. Returns an embedded message.
         * @param {JSON} content 
         * @param {string} coinIndex 
         * @returns discord embedded message
         */
        function getSpecificCoinInfoEmbed(content, coinIndex) {
            const cryptoName = content[coinIndex].id.charAt(0).toUpperCase() + content[coinIndex].id.slice(1);
            const cryptoSymbol = content[coinIndex].symbol.toUpperCase();
            const cryptoImage = content[coinIndex].image;
            //const cryptoLastUpdated = content[coinIndex].last_updated;
            const cryptoRank = content[coinIndex].market_cap_rank;

            const cryptoPriceChange24h = content[coinIndex].price_change_percentage_24h;
            const cryptoPercentChange24h = new Intl.NumberFormat("en-CA", {
                style: "currency",
                currency: "USD"
            }).format(content[coinIndex].price_change_24h);

            const cryptoPrice = new Intl.NumberFormat("en-CA", {
                style: "currency",
                currency: "USD"
            }).format(content[coinIndex].current_price);
            const cryptoHigh24 = new Intl.NumberFormat("en-CA", {
                style: "currency",
                currency: "USD"
            }).format(content[coinIndex].high_24h);
            const cryptoLow24 = new Intl.NumberFormat("en-CA", {
                style: "currency",
                currency: "USD"
            }).format(content[coinIndex].low_24h);
            const cryptoMarketCap = new Intl.NumberFormat("en-CA", {
                style: "currency",
                currency: "USD"
            }).format(content[coinIndex].market_cap);
            const cryptoAllTimeHigh = new Intl.NumberFormat("en-CA", {
                style: "currency",
                currency: "USD"
            }).format(content[coinIndex].ath);

            let cryptoEmbed = new Discord.MessageEmbed()
                //.setDescription(`**Current Price**\n\`${cryptoPrice}\``)
                .setAuthor(`${cryptoName} (${cryptoSymbol})`, cryptoImage)
                .setTimestamp()
                .setColor("RANDOM")
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .setFields({
                    name: ":first_place: Rank",
                    value: `\`\`\`${cryptoRank}\`\`\``,
                    inline: true
                }, {
                    name: ":dollar: Currect Price",
                    value: `\`\`\`${cryptoPrice}\`\`\``,
                    inline: true
                }, {
                    name: "📊 All Time High",
                    value: `\`\`\`${cryptoAllTimeHigh}\`\`\``,
                    inline: true
                }, {
                    name: `:chart_with_upwards_trend: 24 Hour High`,
                    value: `\`\`\`${cryptoHigh24}\`\`\``,
                    inline: true
                }, {
                    name: ":chart_with_downwards_trend: 24 Hour Low",
                    value: `\`\`\`${cryptoLow24}\`\`\``,
                    inline: true
                }, {
                    name: ":chart: Market Cap",
                    value: `\`\`\`${cryptoMarketCap}\`\`\``,
                    inline: true
                });
            return message.channel.send({ embeds: [cryptoEmbed] })
        }

        /**
         * Get the list of the top 24 cryptocurrency by total market cap. Returns an embedded message.
         * @param {JSON} content 
         * @returns discord embedded message
         */
        function getCryptoListEmbed(content) {
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
            let coinListEmbed = new Discord.MessageEmbed()
                .setTitle("Top Cryptocurrency by Market Cap")
                .setDescription(`All prices are in \`USD\` :money_with_wings: \n\n[Data Provided by CoinGecko](https://www.coingecko.com/en)\n\n`)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL());

            for (let j = 0; j < cryptoName.length; j++) {
                coinListEmbed.addFields({
                    name: `${j + 1}. ${cryptoName[j].charAt(0).toUpperCase() + cryptoName[j].slice(1)}`,
                    value: `\`${cryptoSymbol[j].toUpperCase()}\`  →  \`$${cryptoPrice[j].toString()}\``,
                    inline: true
                });
            }
            return message.channel.send({ embeds: [coinListEmbed] });
        }

        /**
         * Cycles through the JSON via HTTPS GET Request then checks for the key and values with respect to the input. 
         * Returns the coin info if found, otherwise returns an error embed
         * @param {JSON | URL | string} content 
         * @param {string} input {user input} 
         * @returns 
         */
        function getCoin(content, input) {
            got(content, { JSON: true })
                .catch((err) => {
                    const throwEmbed = new Discord.MessageEmbed()
                        .setAuthor("Error")
                        .setColor("RED")
                        .setDescription(`Error Message: \`${err}\``);
                    message.channel.send({ embeds: [throwEmbed] });
                })
                .then(result => {
                    const content = JSON.parse(result.body);
                    let count = 1;
                    /**
                     * "key" is the JSON index
                     */
                    for (const key in content) {
                        if (content[key].id == input || content[key].symbol == input) {
                            //console.log("148: Count: " + count);
                            return getSpecificCoinInfoEmbed(content, key);
                        }
                        count++;
                        //console.log("148: Count: " + count);
                    }
                    if (count > 199) {
                        const invalidEmbed = new Discord.MessageEmbed()
                            //.setTitle("Error")
                            .setColor("RED")
                            // .setTimestamp()
                            // .setFooter(client.user.username, client.user.displayAvatarURL())
                            .setDescription(`\`${cryptoInput}\` is an invalid name or symbol\n`);
                        return message.reply({ embeds: [invalidEmbed] });
                    }
                });
            /* Alternative */
            // Object.entries(content).forEach(([key, value]) => {
            //     if ((value.id == input) || (value.symbol == input)) {
            //         getSpecificCoinInfoEmbed(content, key);
            //     }
            // });
        }


        if (!cryptoInput) { // top 24 crypto by market cap
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
                    getCryptoListEmbed(content);
                });
        }
        else if (cryptoInput == "list") {
            coinGeckoURL = `${coinGeckoURL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=201&page=1&sparkline=false`;
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
                    const cryptoSymbol = [];
                    for (let i = 0; i < content.length; i++) {
                        cryptoSymbol.push(content[i].symbol.toUpperCase());
                    }
                    //console.log(cryptoSymbol.toString() + "\n" + cryptoSymbol.length);

                    let coinListEmbed = new Discord.MessageEmbed()
                        .setTitle(":coin: Top 200 Cryptocurrency Symbols in Order of Market Cap")
                        .setTimestamp()
                        .setFooter(client.user.username, client.user.displayAvatarURL());

                    let tempStr = `| `;
                    for (let i = 0; i < cryptoSymbol.length; i++) {
                        tempStr += `\`${cryptoSymbol[i]}\` | `;
                    }
                    coinListEmbed.setDescription(tempStr);
                    //console.log(tempStr);
                    //coinListEmbed.setDescription(`${cryptoSymbol[i]} | `)
                    return message.channel.send({ embeds: [coinListEmbed] });
                });
        }
        else {
            coinGeckoURL = `${coinGeckoURL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=201&page=1&sparkline=false`;
            getCoin(coinGeckoURL, cryptoInput);
            // if (cryptoInput === "bitcoin" || cryptoInput === "btc") { getCoin(coinGeckoURL, cryptoInput); }
            // else if (cryptoInput === "ethereum" || cryptoInput === "eth" || cryptoInput === "ether") { getCoin(coinGeckoURL, cryptoInput); }
            // else if (cryptoInput === "cardano" || cryptoInput === "ada") { getCoin(coinGeckoURL, cryptoInput); }

        }

    }
});
