const Command = require("../Structures/Command.js");
const config = require("../Data/config.json");
const Discord = require("discord.js");

module.exports = new Command({
    name: "testbutton",
    description: "testbutton",
    usage: `\`${config.prefix}testbutton\``,
    permission: "SEND_MESSAGES",
    async run(message, args, client) {

        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('ban_yes')
                    .setLabel('YES')
                    .setStyle("SUCCESS")
            )
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('ban_no')
                    .setLabel('NO')
                    .setStyle("DANGER")
            )

        const linkRow = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setURL('https://google.ca')
                    .setLabel('VISIT')
                    .setStyle("LINK")
            )

        // const m = message.reply({
        //     content: "Ayo?",
        //     components: [row, linkRow],
        //     ephemeral: true,
        // })

        // client.on("clickButton", async (button) => {
        //     if (button.id === "ban_yes") {
        //         message.channel.send("YES");
        //     }
        //     if (button.id === "ban_no") {
        //         message.channel.send("NO");
        //     }
        //     button.defer();
        // });


        const throwEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription("This is an embed");

        const throwEmbed2 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription("This is an embed 2");

        const m = await message.reply({
            content: "This is a test Button format.",
            ephemeral: true,
            embeds: [throwEmbed],
            components: [row], //, linkRow]
        });

        const iFilter = i => i.user.id === message.author.id;

        const collector = m.createMessageComponentCollector({ filter: iFilter, time: 0 });

        collector.on('collect', async i => {
            if (i.customId === "ban_yes") {
                i.reply({ content: "You chose YES.", ephemeral: true });
                m.edit({ content: "ayo?" });
            }
            else if (i.customId === "ban_no") {
                i.reply({ content: "You chose NO.", ephemeral: true });
            }
        });


    }
});