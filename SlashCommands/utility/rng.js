const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    userPermissions: ["SEND_MESSAGES"],
    ...new SlashCommandBuilder()
        .setName("rng")
        .setDescription("Get a random number between two numbers")
        .addIntegerOption((option) =>
            option
                .setName("minimum")
                .setDescription("The lower bound; smallest number")
                .setRequired(true)
        )
        .addIntegerOption((option) =>
            option
                .setName("maximum")
                .setDescription("The upper bound; biggest number")
                .setRequired(true)
        ),

    run: async (client, interaction, args) => {

        const lowest = interaction.options.getInteger("minimum");
        const maximum = interaction.options.getInteger("maximum");

        /**
         * Returns a random number between the min and max values (always assumes correct input)
         * @param {Integer} min - minimum index number
         * @param {Integer} max - maximum index number
         * @returns random number
         */
        function randomNumMinToMax(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        if (lowest > maximum) {
            // return interaction.followUp({
            //     embeds: [new MessageEmbed()
            //         .setColor("RED")
            //         .setTimestamp()
            //         .setFooter(client.user.username, client.user.displayAvatarURL())
            //         .setDescription(`The minimum number cannot be larger than the maximum number!\n\nYou entered: Min: \`${lowest}\`, Max: \`${maximum}\``)]
            // });
            return interaction.followUp({
                embeds: [new MessageEmbed()
                    .setColor("RANDOM")
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                    .setDescription(`Random number between \`${lowest}\` and \`${maximum}\`: \`${randomNumMinToMax(maximum, lowest)}\``)]
            });
        }
        else {
            return interaction.followUp({
                embeds: [new MessageEmbed()
                    .setColor("RANDOM")
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                    .setDescription(`Random number between \`${lowest}\` and \`${maximum}\` \n\`\`\`${randomNumMinToMax(lowest, maximum)}\`\`\``)]
            });
        }

    },
};
