var ready = require("./ready.js");
exports.run = (client, message, args) => {
  message.channel.send("test! " + ready.party);
  console.log(ready.party);
}
