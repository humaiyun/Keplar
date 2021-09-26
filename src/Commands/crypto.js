/* https://www.coingecko.com/en/api/documentation */

const Discord = require("discord.js");
const Command = require("../Structures/Command.js");
const config = require("../Data/config.json");
const got = require("got");

module.exports = new Command({
    name: "crypto",
    description: "Returns information for cryptocurrencies",
    usage: `\`${config.prefix}crypto [name | symbol]\``,
    permission: "SEND_MESSAGES",

    async run(message, args, client) {
        const cryptoInput = args.splice(1).join(" ");
        let coinGeckoURL = `https://api.coingecko.com/api/v3/`;

        function getSpecificCoinInfo(content, coinIndex) {
            const cryptoName = content[coinIndex].id.charAt(0).toUpperCase() + content[coinIndex].id.slice(1);
            const cryptoSymbol = content[coinIndex].symbol.toUpperCase();
            const cryptoImage = content[coinIndex].image;
            const cryptoLastUpdated = content[coinIndex].last_updated;
            const cryptoRank = content[coinIndex].market_cap_rank;
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

            let embedArr = new Discord.MessageEmbed()
                //.setDescription(`**Current Price**\n\`${cryptoPrice}\``)
                .setAuthor(`${cryptoName} (${cryptoSymbol})`, cryptoImage)
                .setFields({
                    name: ":first_place: Rank",
                    value: `\`${cryptoRank}\``,
                    inline: true
                }, {
                    name: ":dollar: Currect Price",
                    value: `\`${cryptoPrice}\``,
                    inline: true
                }, {
                    name: "📊 All Time High",
                    value: `\`${cryptoAllTimeHigh}\``,
                    inline: true
                }, {
                    name: `:chart_with_upwards_trend: 24 Hour High`,
                    value: `\`${cryptoHigh24}\``,
                    inline: true
                }, {
                    name: ":chart_with_downwards_trend: 24 Hour Low",
                    value: `\`${cryptoLow24}\``,
                    inline: true
                }, {
                    name: ":chart: Market Cap",
                    value: `\`${cryptoMarketCap}\``,
                    inline: true
                });
            return message.channel.send({ embeds: [embedArr] })
        }

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
                        .setTitle("Top Cryptocurrency by Market Cap")
                        .setDescription(`All currency is in \`USD\` :money_with_wings: \n\n[Data Provided by CoinGecko](https://www.coingecko.com/en)\n\n`);

                    for (let j = 0; j < cryptoName.length; j++) {
                        embedArr.addFields({
                            name: `${j + 1}. ${cryptoName[j].charAt(0).toUpperCase() + cryptoName[j].slice(1)}`,
                            value: `\`${cryptoSymbol[j].toUpperCase()}\`  →  \`$${cryptoPrice[j].toString()}\``,
                            inline: true
                        });
                    }
                    message.channel.send({ embeds: [embedArr] });
                });
        }
        else {
            if (cryptoInput === "bitcoin" || cryptoInput === "btc") {
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
                        getSpecificCoinInfo(content, 0);
                    });
            }
            else if (cryptoInput === "etherem" || cryptoInput === "eth" || cryptoInput === "ether") {
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
                        getSpecificCoinInfo(content, 1);
                    });
            }
            else if (cryptoInput === "cardano" || cryptoInput === "ada") {
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
                        getSpecificCoinInfo(content, 2);
                    });
            }
            else {
                const invalidEmbed = new Discord.MessageEmbed()
                    .setTitle("Error")
                    .setColor("RED")
                    .setDescription(`\`${cryptoInput}\` is an invalid name or symbol`);
                return message.reply({ embeds: [invalidEmbed] });
            }
        }

    }
});
