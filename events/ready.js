const client = require("../index");
const AsciiTable = require("ascii-table");

client.on("ready", () => {
    console.clear();
    const table = new AsciiTable();
    table.addRow(`${client.user.tag} has loaded! 🎈`);
    client.user.setActivity("the Bot Olympics", { type: "COMPETING" });
    console.log(table.toString());
});
