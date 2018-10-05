var users = require("../users.js");
exports.run = (client, message, args) => {
    async function sendMessage(){
      //users.create(message.author);
      //users.setWeapon(message.author, "Sword of the Cosmos");
      message.channel.send(await users.getWeapon(message.author));
    }
    sendMessage();
}
