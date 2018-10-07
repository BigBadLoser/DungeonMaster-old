var boss = require("../boss.js");
var party = [];
var maxPartySize = 2;
module.exports.party = party;
exports.run = (client, message, args) => {
  message.channel.send("DEBUG: " + message.author + " has readied up");
  party.push(message.author);
  var i, partyMembersDisplay = "";
  if (party.length > 1){
    for (i = 0; i < party.length; i++){
      if (i + 1 != party.length){
        partyMembersDisplay += party[i].username + ", ";
      }
      else {
        partyMembersDisplay += party[i].username;
      }
    }
  }
  else {partyMembersDisplay += message.author.username;}
  if (party.length == maxPartySize){
    console.log(party);
    boss.spawnNew(party);
    boss.getEmbed(boss.getCurrentBoss());
  }
  message.channel.send("The current party is: " + partyMembersDisplay + " (" + party.length + "/" + maxPartySize + ")");

}
