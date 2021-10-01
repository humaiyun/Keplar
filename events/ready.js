const client = require("../index");

client.on("ready", () => {
    console.clear();
    console.log(`${client.user.tag} has loaded! 🎈`);
    client.user.setActivity("the Bot Olympics", { type: "COMPETING" });
});
