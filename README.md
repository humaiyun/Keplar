<h1 align="center">
  <br>
  <a href="https://github.com/humaiyun/Keplar"><img src="https://i.imgur.com/elGCHSV.png"></a>
  Keplar
</h1>
<h3 align=center>A multipurpose Discord bot built with <a href=https://discord.js.org/#/>discord.js v13</a></h3>

<div align="center">
  <a href="https://github.com/humaiyun/Keplar/#readme"><img src="https://i.imgur.com/KaLFwxa.png" alt="keplar v1.0.0"></a>
  <a href="https://nodejs.org/en/" target="_blank"><img src="https://i.imgur.com/uvlgpbh.png" alt="node.js v16.9.1"></a>
  <a href="https://github.com/discordjs" target="_blank"><img src="https://i.imgur.com/Llwof2G.png" alt="discord.js v13.2.0@dev"></a>
  <a href="https://github.com/humaiyun" target="_blank"><img src="https://i.imgur.com/gtuq1SA.png" alt="humaiyun"></a>
</div><hr>
<div align="center">
  <h3>Table of Contents</h3>
  <a href="#about">About</a>
  — 
  <a href="#features">Features</a>
  — 
  <a href="#setup">Set Up</a>
  — 
  <a href="#wip">Work in Progress</a>
  — 
  <a href="#showcase">Showcase</a>
  — 
  <a href="#license">License</a>
  — 
  <a href="#learned">Lessons Learned</a>
</div>
<hr>
<h2 id="about"> ❓ About </h2>

Keplar is a personal Discord bot project that is constantly expanding. The purpose of this bot is to be a bot for use by my friends and I in our own private Discord servers. With that in mind, this bot was coded assuming it would only be used for private server use. This means the bot has no formal permission handling (e.g. `everyone`, `administrator`, `moderators`, etc.), or automated commands (e.g. `auto roles`, `command disabling`, etc.). 

<strong>Keplar is an ongoing project of mine and it is still under active development at the moment.</strong>

I don't intend to advertise Keplar or get people to add it to their servers, as this is just a project. However, if you want to use Keplar, my recommendation is to download the source code (.zip), or clone the repository to make this a local bot on your computer. Feel free to modify the source code to your liking.

⚠ <strong>Note: </strong>There is a secondary branch, `keplar-old-framework`, which used to be the original main branch (w/ over 120 commits and featured 12+ commands). I do not recommend downloading that since it is on a roughly designed framework. The current `main` branch has a much better framework and is where all active development will be committed to. 

If you end up downloading, cloning, or you simply like this repository, leaving a star ⭐ is much appreciated!


<h2 id="features"> 📃 Features </h2>

Every single command is supported with slash commands as well as prefix-based. Note: Some commands will have several options to them to allow for different types of requests.

* 🎮 **Fun:** Several fun commands such as `8ball`, `advice`, and `coinflip`
* 📷 **Images:** Commands that return an embedded image include `cat`, `meme`, `pokemon`, and `xkcd`
* 🎶 **Music:** Play tunes and more: `play`, `currentSong`, `lyrics`, `shuffle`, `volume`, and 6 more!
* 💰 **Cryptocurrency:** Get current crypto market statistics with `crypto`
* ❔ **Info:** Commands include `info`, `ping`, and `stats` for general server and bot information
* 🔧 **Utility:** For general utility `clear`, and `rng`
* 🪀 **Misc:** Get the definitions of words with `define`, and `stats`

This bot is still in very early development. More commands will be added in the future, with support for both slash, and prefix commands.


<h2 id="setup"> ⚙ Set Up </h2>

To set up Keplar for local host on your computer, you must create a `config.json` file in the root of the repository's directory. This file should be set up similarly to the example given below. **Note: You can change the prefix from `!` to whatever you want.** 

```json
{
    "token": "BOT-TOKEN",
    "prefix": "!",
    "mongooseConnectionString": "MONGODB-CONNECTION-STRING",
    "singleGuildId": "SERVER-ID",
    "apiKeys": 
        {
          "key-1": "API-KEY-1",
          "key-2": "API-KEY-2"
        }
}
```
In terms of how to acquire a bot token, mongoDB connection string, or external api keys, I recommend searching the internet (Google, or YouTube) for in-depth guides. There are a lot of detailed guides on getting a Discord bot set up either locally or on a host site. <a href="https://www.digitaltrends.com/gaming/how-to-make-a-discord-bot/">Example Guide</a>

  <p>
    Other things to install include:
    <ul>
      <li><a href="https://code.visualstudio.com/">Visual Studio Code</a> (Optional - any IDE of your choice works)</li>
      <li><a href="https://nodejs.org/en/">Node.js v16+</a> (Required)</li>
      <li><a href="https://discord.js.org/#/">Discord.js v13+</a> (Required)</li>
    </ul>
  </p>

<h2 id="wip"> 🏗 Work in Progress </h2>
  <p>As previously mentioned, Keplar is in active development and will get more updates in the future.</p>
  <p>
    Some ideas in the works include:
    <ul>
      <li>Database (MongoDB) setup for the collection and storage of information</li>
      <li>Permissions Handler</li>
    </ul>
  </p>
  

<h2 id="showcase"> 🖼 Showcase </h2>
<table>
  <tbody>
    <tr>
      <td>/clear</td>
      <td>/crypto cryptocurrency:</td>
      <td>List of commands</td>
    </tr>
    <tr>
      <td><img src="https://i.imgur.com/ovCLU10.gif" alt="clear command"></td>
      <td><img src="https://i.imgur.com/tjdQU9Z.gif" alt="crypto command"></td>
      <td><img src="https://i.imgur.com/dbXZdzA.gif" alt="full command list"></td>
    </tr>
  </tbody>
</table>
<br>
<table>
  <tbody>
    <tr>
      <td>/pokemon</td>
      <td>/pokemon index:</td>
      <td>/pokemon name:</td>
    </tr>  
    <tr>
      <td><img src="https://i.imgur.com/chQpNs5.gif" alt="pokemon random command"></td>
      <td><img src="https://i.imgur.com/rdKLalj.gif" alt="pokemon index command"></td>
      <td><img src="https://i.imgur.com/eqo7qqp.gif" alt="pokemon name command"></td>
    </tr>
  </tbody>
</table>


<h2 id="license"> 📝 License </h2>
  <p>
    This project is released under the <a href="https://github.com/humaiyun/Keplar/blob/main/LICENSE">GNU GPL v3</a> license. <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">Official Site.</a>
  </p>

<h2 id="learned"> 📚 What I Learned From This Project </h2>
  <p>
    Some of the things I learned from this project include:
    <ul>
      <li>Parsing JSON files and data using built-in JS and NPM Got</li>
      <li>Understanding GET and POST HTTP methods</li>
      <li>Reading and understanding documentation for packages and libraries</li>
      <li>Using and implementing 3rd party API's</li>
      <li>Securing API tokens, keys, and passwords (using both .env and .json files)</li>
      <li>Advanced Git: removing specific commits from history, cherry picking, squashing, branches</li>
    </ul>
  </p>



  
