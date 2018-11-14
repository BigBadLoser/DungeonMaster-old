const { Client, RichEmbed } = require('discord.js');
const bosses = require("./bosses.json");
const users = require("./users.js");
var message;
var testVar = false;

var turnMessage;
//BOSS VARIABLES (1 BOSS AT A TIME, SORRY)
var currentBoss = "slime"; //Temporary, will change by level in the future.
var boss = {
  username: readFile(currentBoss, "name"),
  level: readFile(currentBoss, "level"),
  adjective: "",
  health: 100,
  initiativeBonus: 0,
  initiative: 0
}
var party = [];
var round = 1;

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

async function doTurns(partyMember){
  if (boss.health != 0){
    if (partyMember != party.length){
      await message.channel.send(":grinning: " + party[partyMember].username + "'s turn.'");
      //Creates a filter for our reaction collector, testing for abilities.
      await setTimeout(testF, 200, partyMember); //this needs to wait to be called only after that message ^ is sent
      //.then doesn't work.
      //await testF(partyMember);
    }
  }
    else {
      round++;
      message.channel.send("```ROUND " + round + "```");
    }
  //doTurns();
}

function testF(partyMember){
  console.log(message.content);
  const filter = (reaction, user) => {
  return reaction.emoji.name === '👌';
  };
    message.awaitReactions(filter, { max: 4, time: 10000, errors: ['time'] })
        .then(collected => console.log(collected.size))
        .catch(collected => {
            console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
            doTurns(partyMember + 1);
        });
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
  startFight: /*async*/ function(partyArray){
    //console.log(await getPartyCR(partyArray));
    party = partyArray;
    var rollOutcome = Math.floor(Math.random() * 20) + 1;
    boss.initiative = rollOutcome + boss.initiativeBonus;
    party.push(boss);
    party.sort(function(a,b){return a.initiative < b.initiative});

    message.channel.send("```Round 1```");
    doTurns(0);
  },
  getCurrentBoss: function(){
    return currentBoss;
  },
  passMessage: function(messageT){
    message = messageT;
    //console.log(messageT.content);
  },
  testFunction: function(messageT){
    messageT.react("👍");
    console.log("worked");
  }
}
