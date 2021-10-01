const Command = require("../Structures/Command.js");
const config = require("../Data/config.json");
const Discord = require("discord.js");

const ytdl = require("ytdl-core");
const ytSearch = require('yt-search');

const queue = new Map();

const videoPlayer = async (guild, song) => {
    const songQueue = queue.got(guild.id);

    if (!song) {
        songQueue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }

    const stream = ytdl(song.url, { filter: "audioonly" });
    songQueue.connection.play(stream, { seek: 0, volume: 0.5 })
        .on("finish", () => {
            songQueue.songs.shift();
            videoPlayer(guild, songQueue.songs[0]);
        });
    await songQueue.textChannel.send(`🎶 Now playing **${song.title}**`);
}

const skipSong = (message, serverQueue) => {
    if (!message.member.voice.channel) return message.channel.send({
        embeds: [new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("You need to be in a channel to execute this command!")]
    });
    if (!serverQueue) {
        return message.channel.send({
            embeds: [new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`There are no songs in queue 😔`)]
        });
    }
    serverQueue.connection.dispatcher.end();
}

const stopSong = (message, serverQueue) => {
    if (!message.member.voice.channel) return message.channel.send({
        embeds: [new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("You need to be in a channel to execute this command!")]
    });
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
}

module.exports = new Command({
    name: "music",
    description: "Play music in a voice channel.",
    usage: `\`${config.prefix}music <link> [stop | skip]\``,
    permission: "SEND_MESSAGES",
    async run(message, args, client) {

        //const checkSkipOrStop = args.splice(1).join(" ");
        //console.log(`skip or stop:${checkSkipOrStop}`)
        console.log(`args[0]: ` + args[0]);
        console.log(`args.splice(1).join(" "): ${args.splice(1).join(" ")}`);

        /* Validate voice channel and permissions */
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send({
            embeds: [new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("You need to be in a channel to execute this command!")]
        });
        const permissions = voice_channel.permissionsFor(message.client.user);
        if ((!permissions.has('SPEAK')) || (!permissions.has('CONNECT'))) return message.channel.send({
            embeds: [new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("You dont have the correct permissions!")]
        });

        /* Server music queue */
        const serverQueue = queue.get(message.guild.id);

        if (args[0] === "music") {
            if (!args.length) return message.channel.send({
                embeds: [new Discord.MessageEmbed()
                    .setColor("RED")
                    .setDescription("You need to send the second argument!")]
            });

            let song = [];

            /* Check if argument is a URL */
            if (ytdl.validateURL(args.splice(1).join(" "))) {
                console.log("49: validated");
                const songInfo = await ytdl.getInfo(args.splice(1).join(" "));
                song = {
                    title: songInfo.videoDetails.title,
                    url: songInfo.videoDetails.video_url
                }
            }
            else { /* Search youtube for the top result via query */
                const videoFinder = async (query) => {
                    const videoResult = await ytSearch(query);
                    return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
                }
                const video = await videoFinder(args.join(" "));
                if (video) {
                    song = {
                        title: video.title,
                        url: video.url
                    }
                }
                else {
                    message.channel.send({
                        embeds: [new Discord.MessageEmbed()
                            .setColor("RED")
                            .setDescription("Error finding video")]
                    });
                }

            }

            // Validate the server queue (check if it exists; for the first vid it is always true -> it doesn't exist)
            if (!serverQueue) {
                const queueConstructor = {
                    voiceChannel: voice_channel,
                    textChannel: message.channel,
                    connection: null,
                    songs: []
                }

                queue.set(message.guild.id, queueConstructor);
                queueConstructor.songs.push(song);

                try {
                    const connection = await voice_channel.join();
                    queueConstructor.connection = connection;
                    videoPlayer(message.guild, queueConstructor.songs[0]);
                }
                catch (error) {
                    queue.delete(message.guild.id);
                    message.channel.send({
                        embeds: [new Discord.MessageEmbed()
                            .setColor("RED")
                            .setDescription("There was an error connecting to the voice channel.")]
                    });
                    throw error;
                }
            }
            else {
                serverQueue.songs.push(song);
                return message.channel.send({
                    embeds: [new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription(`👍 **${song.title}** has been added to the queue!`)]
                });
            }
        }

        else if (args[0] === "music" && args.splice(1).join(" ") === "skip") {
            skipSong(message, serverQueue);
        }
        else if (args[0] === "music" && args.splice(1).join(" ") === "stop") {
            stopSong(message, serverQueue);
        }

    }

});
