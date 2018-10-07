var users = require("../users.js");
var boss = require("../boss.js");
exports.run = (client, message, args) => {
  message.channel.send(boss.getEmbed("slime"));
}
