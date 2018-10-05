const Enmap = require('enmap');
const db = new Enmap({ name: 'userData' });
const userStructure = {
  userObject: "",
  level: "",
  equippedWeapon: "",
  equippedSpellbook: "",
  inventory: []
}
module.exports = {
  test: async function(){
    await db.defer;
    return("test");
  },
  create: async function(user){
    db.set(user.id, userStructure);
    console.log(user.id);
  },
  setWeapon: async function(user, weapon){
    await db.defer;
    db.set(user.id, weapon);
  },
  getWeapon: async function(user){
    await db.defer;
    var returnMe =  db.get(user.id);
    return returnMe;
  }
}
