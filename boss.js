const { Client, RichEmbed } = require('discord.js');
const bosses = require("./bosses.json");

function readFile(bossName, path){
  return(bosses[bossName][path]);
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

  }
}
