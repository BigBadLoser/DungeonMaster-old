var boss = require("../boss.js");
var party = [];
var maxPartySize = 2; //TODO: Dynamic party sizing
module.exports.party = party;
exports.run = (client, message, args) => {
  message.channel.send("DEBUG: " + message.author + " has readied up");
  party.push(message.author); //Add the user that ran the command to the party array

  var i, partyMembersDisplay = "";
  if (party.length > 1){ //Loop through party members if the party has more than one member
    for (i = 0; i < party.length; i++){
      if (i + 1 != party.length){
        partyMembersDisplay += party[i].username + ", "; //If [i] isn't the last member, add a comma to the display
      }
      else {
        partyMembersDisplay += party[i].username; //If last member, just add to display, no comma needed.
      }
    }
  }
  else {partyMembersDisplay += message.author.username;} //If it has one member only, just display.
  if (party.length == maxPartySize){ //If the party is full, spawn a new boss
    console.log(party);
    boss.spawnNew(party); //("spawn a new boss")
    message.channel.send(boss.getEmbed(boss.getCurrentBoss())); //and send a message alerting players of the boss
  }
  //When party changes, display the new party size and its members.
  //Displays "The current party is $user1, $user2, $user3 (3/3")"
  message.channel.send("The current party is: " + partyMembersDisplay + " (" + party.length + "/" + maxPartySize + ")");

}
