const Command = require("../Structures/Command.js");
const Discord = require("discord.js");

module.exports = new Command({
    name: "tstbtn",
    description: "Used to test Button.",
    permission: "ADMINISTRATOR",

    async run(message, args, client) {
        const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setLabel("Blue")
                .setStyle("PRIMARY")
                .setCustomId("blue")
                .setDisabled(false)
                .setEmoji("💙"),
        );

        const m = await message.channel.send({ content: "This is a test Button format.", components: [row] });

        const iFilter = i => i.user.id === message.author.id;

        const collector = m.createMessageComponentCollector({ filter: iFilter, time: 0 });

        collector.on('collect', async i => {
            if (i.customId === "blue") {
                i.reply({ content: "You chose Blue.", ephemeral: true });
            }
        });

        // message.channel.send({
        //     content: "This is a test Button format.",
        //     components: [row]
        // });

        // const filter = (interaction) => {
        //     if (interaction.user.id === message.author.id) return true;
        //     return interaction.reply({ content: "You cannot use this Button." });
        // }

        // const collector = message.channel.createMessageComponentCollector({ filter, time: 1000 * 60, max: 10 });
        // collector.on('end', (ButtonInteraction) => {
        //     const id = ButtonInteraction.first().customId;
        //     if (id === "blue") return ButtonInteraction.first().reply({ content: "You chose Blue.", ephemeral: true });
        // });


    }
});