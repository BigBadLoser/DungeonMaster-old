const { Client, RichEmbed } = require('discord.js');
const bosses = require("./bosses.json");
const users = require("./users.js");
//BOSS VARIABLES (1 BOSS AT A TIME, SORRY)
var bossHealth = 0;
var currentBoss = "slime";

//Helper function for reading values from our JSON files
function readFile(bossName, path){
  return(bosses[bossName][path]);
}

/* Function that calculates the parties "Challenge Rating"
*  Currently uses a normal averaging formula
*  In the future this will be improved to allow for better balancing
* TODO: Better averaging formula
*/
async function getPartyCR(party){
  var i;
  var partyCR = 0;
  for (i = 0; i < party.length; i++){ //Loops through party
    users.ensure(party[i]); //Make sure everyone in the party exists in the database before trying to read data from them
    partyCR += await users.getLevel(party[i]); //read their level and add it to total CR
  }
  partyCR = partyCR / party.length; //TODO: Better math here. This just averages it atm.
  return partyCR;
}
module.exports = {
  getEmbed: function(monster){ //Creates a RichEmbed to display our boss info
    var embed = new RichEmbed()
    .setTitle(readFile(monster, "name"))
    .setColor(readFile(monster, "color"))
    .setDescription(readFile(monster, "description"))
    .setFooter("© BigBadLoser", "https://cdn.discordapp.com/avatars/84908345542049792/3695e65614d1e6326257344b316f42bb.png")
    .setTimestamp();

    return(embed);

  },
  getHealthDisplay: function(){

  },
  spawnNew: async function(party){
    console.log("called");
    console.log(await getPartyCR(party));
  },
  getCurrentBoss: function(){
    return currentBoss;
  }
}
