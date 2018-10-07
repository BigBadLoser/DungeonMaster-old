var ready = require("./ready.js");
var users = require("../users.js");
exports.run = (client, message, args) => {
  async function test(){
    await users.setWeapon(message.author, args, "equippedWeapon");
    console.log("Tried to set it to " + args);
  }
  test();
}
