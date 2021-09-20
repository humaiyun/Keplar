/* package: images-scraper:  https://www.npmjs.com/package/images-scraper npm install images-scraper */
/*const Command = require("../Structures/Command.js");

const Scraper = require('images-scraper');
const google = new Scraper(); {
    puppeteer: {
        headless: true;
    }
}

module.exports = new Command({
    name: "image",
    description: "scrape Google images using puppeteer (headless chrome API) then send the message in text channel as a url",
    permission: "SEND_MESSAGES",
    async run(message, args, client) {

        const image_query = args.join(" ");
        if (!image_query) {
            return message.channel.send("Enter an image search term!");
        }

        const image_results = await google.scrape(image_query, 1);
        message.channel.send(image_results[0].url);
    }
}); */