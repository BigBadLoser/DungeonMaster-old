const { Client, RichEmbed } = require('discord.js');
const bosses = require("./bosses.json");
const users = require("./users.js");
//BOSS VARIABLES (1 BOSS AT A TIME, SORRY)
var bossHealth = 0;


function readFile(bossName, path){
  return(bosses[bossName][path]);
}

async function getPartyCR(party){
  var i;
  var partyCR = 0; //Sloppy way of doing it. TEMPORARY
  for (i = 0; i < party.length; i++){
    users.ensure(party[i]);
    partyCR += await users.getLevel(party[i]);
  }
  partyCR = partyCR / party.length;
  return partyCR;
}
module.exports = {
  getEmbed: function(monster){
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
    return "slime";
  }
}
