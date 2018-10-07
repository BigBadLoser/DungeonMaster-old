var ready = require("./ready.js");
var users = require("../users.js");
exports.run = (client, message, args) => {
  async function test(){
    await users.setInitiativeBonus(message.author, args);
    console.log("Tried to set it to " + args);
  }
  test();
}
