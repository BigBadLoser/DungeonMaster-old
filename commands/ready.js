var boss = require("../boss.js");
var users = require("../users.js");
var party = [];
var maxPartySize = 2; //TODO: Dynamic party sizing
module.exports.party = party;
exports.run = (client, message, args) => {
  //message.channel.send("DEBUG: " + message.author + " has readied up");
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
  //When party changes, display the new party size and its members.
  //Displays "The current party is $user1, $user2, $user3 (3/3")"
  message.channel.send("The current party is: " + partyMembersDisplay + " (" + party.length + "/" + maxPartySize + ")");

  if (party.length == maxPartySize){ //If the party is full, spawn a new boss
    //Roll Initiative for everyone in the party
    message.channel.send("Rolling Initiative...");
    async function rollInitiative(){
      var f;
      for (f = 0; f < party.length; f++){
        party[f].initiative = 0; //resets initiative
        var rollOutcome = Math.floor(Math.random() * 20) + 1; //rolls a d20 for their initiative
        var initiativeBonus = await users.getInitiativeBonus(party[f]) //gets their init bonus
        party[f].initiative = +rollOutcome + +initiativeBonus;
        console.log("OUTCOME: " + initiativeBonus);
        message.channel.send(party[f]+ " rolled a " + rollOutcome + " + their bonus of " + initiativeBonus + " for a total of " + party[f].initiative);
        if (f + 1 == party.length){
          spawnBoss();
        }
      }
    }
    rollInitiative();

    function spawnBoss(){
      //message.channel.send(boss.getEmbed(boss.getCurrentBoss()));
      boss.startFight(party); //("spawn a new boss")
      party = [];
    }
  }
}
