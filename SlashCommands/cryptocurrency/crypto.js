
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const got = require("got");

module.exports = {
    userPermissions: ["SEND_MESSAGES"],
    ...new SlashCommandBuilder()
        .setName("crypto")
        .setDescription(`Get the latest market information for various cryptocurrencies. Supports the top 200 coins`)
        .addStringOption((option) =>
            option
                .setName("cryptocurrency")
                .setDescription("Enter the full name or symbol to get information of that coin")
                .setRequired(false)
        )
        .addBooleanOption((option) =>
            option
                .setName("list")
                .setDescription("If true, returns a list of the top 200 crypto's by their symbol")
                .setRequired(false)
        ),


    run: async (client, interaction, args) => {

        let coinGeckoURL = `https://api.coingecko.com/api/v3/`; // `${coinGeckoURL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=24&page=1&sparkline=false`;

        const str = interaction.options.getString("cryptocurrency");
        const bool = interaction.options.getBoolean("list");
        //console.log(`integer: ${integer}   str: ${str}`);

        if (!str && !bool) { // if both null
            coinGeckoURL = `${coinGeckoURL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=24&page=1&sparkline=false`;
            got(coinGeckoURL, { JSON: true })
                .catch((err) => {
                    const throwEmbed = new MessageEmbed()
                        .setColor("RED")
                        .setDescription(`Error Message: \`${err}\``);
                    interaction.followUp({ embeds: [throwEmbed] });
                })
                .then(result => {
                    const content = JSON.parse(result.body);
                    getCryptoListEmbed(content);
                });
        }

        else if (bool && !str) { // list
            coinGeckoURL = `${coinGeckoURL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=201&page=1&sparkline=false`;
            got(coinGeckoURL, { JSON: true })
                .catch((err) => {
                    const throwEmbed = new MessageEmbed()
                        .setColor("RED")
                        .setDescription(`Error Message: \`${err}\``);
                    interaction.followUp({ embeds: [throwEmbed] });
                })
                .then(result => {
                    const content = JSON.parse(result.body);
                    const cryptoSymbol = [];
                    for (let i = 0; i < content.length; i++) {
                        cryptoSymbol.push(content[i].symbol.toUpperCase());
                    }
                    let coinListEmbed = new MessageEmbed()
                        .setTitle(":coin: Top 200 Cryptocurrency Symbols in Order of Market Cap")
                        .setTimestamp()
                        .setFooter(client.user.username, client.user.displayAvatarURL());

                    let tempStr = `| `;
                    for (let i = 0; i < cryptoSymbol.length; i++) {
                        tempStr += `\`${cryptoSymbol[i]}\` | `;
                    }
                    coinListEmbed.setDescription(tempStr);
                    return interaction.followUp({ embeds: [coinListEmbed] });
                });
        }

        else if (str && !bool) { // crypto name or symbol
            coinGeckoURL = `${coinGeckoURL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=201&page=1&sparkline=false`;
            getCoin(coinGeckoURL, str.toLowerCase());
        }

        else if (str && bool) { // throw error if both commands picked at the same time 
            const throwEmbed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`Error: You can't select both options at the same time!`);
            interaction.followUp({ embeds: [throwEmbed] });
        }





        /**
         * Get the list of the top 24 cryptocurrency by total market cap. Returns an embedded message.
         * @param {JSON} content 
         * @returns list of top 24 crypto in a discord embedded message
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
            let coinListEmbed = new MessageEmbed()
                .setTitle("Top Cryptocurrency by Market Cap")
                .setDescription(`All prices are in \`USD\` :money_with_wings: \n[Data Provided by CoinGecko](https://www.coingecko.com/en)\n\n`)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL());

            for (let j = 0; j < cryptoName.length; j++) {
                coinListEmbed.addFields({
                    name: `${j + 1}. ${cryptoName[j].charAt(0).toUpperCase() + cryptoName[j].slice(1)}`,
                    value: `\`${cryptoSymbol[j].toUpperCase()}\`  →  \`$${cryptoPrice[j].toString()}\``,
                    inline: true
                });
            }
            return interaction.followUp({ embeds: [coinListEmbed] });
        }


        /**
         * Cycles through the JSON via HTTPS GET Request then checks for the key and values with respect to the input. 
         * Returns the coin info if found, otherwise returns an error embed
         * @param {JSON | URL | string} content 
         * @param {string} input {user input from the slash command options/parameters} 
         * @returns an embedded message about the specific crypto coin
         */
        function getCoin(content, input) {
            got(content, { JSON: true })
                .catch((err) => {
                    const throwEmbed = new MessageEmbed()
                        .setAuthor("Error")
                        .setColor("RED")
                        .setDescription(`Error Message: \`${err}\``);
                    interaction.followUp({ embeds: [throwEmbed] });
                })
                .then(result => {
                    const content = JSON.parse(result.body);
                    let count = 1;

                    //"key" is the JSON index
                    for (const key in content) {
                        if (content[key].id == input || content[key].symbol == input) {
                            return getSpecificCoinInfoEmbed(content, key);
                        }
                        count++;
                    }
                    if (count > 199) {
                        const invalidEmbed = new MessageEmbed()
                            .setColor("RED")
                            // .setTimestamp()
                            // .setFooter(client.user.username, client.user.displayAvatarURL())
                            .setDescription(`\`${input}\` is an invalid name or symbol\n`);
                        return interaction.followUp({ embeds: [invalidEmbed] });
                    }
                });
        }

        /**
         * Get detailed info of a specific cryptocurrency. Returns an embedded message.
         * @param {JSON} content 
         * @param {string} coinIndex 
         * @returns detailed info of a specific crypto and returns it in a discord embedded message
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

            let cryptoEmbed = new MessageEmbed()
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
            return interaction.followUp({ embeds: [cryptoEmbed] })
        }





















    },
};