const Enmap = require('enmap');
const db = new Enmap({
  name: "userData",
  autoFetch: true,
  fetchAll: true
});
const userStructure = {
  userObject: "",
  equippedWeapon: "Basic Sword",
  equippedSpellbook: "Necronomicon",
  inventory: [],
  xp: 0,
  level: 1,
  initiativeBonus: 0
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
    db.set(user.id, weapon, "equippedWeapon");
  },
  getWeapon: async function(user){
    await db.defer;
    return (db.get(user.id, "equippedWeapon"));
  },
  setLevel: async function(user, newLevel){
    await db.defer;
    //db.set(user.id, )
  },
  getLevel: async function(user){
    await db.defer;
    return (db.get(user.id, "level"));
  },
  ensure: async function(user){
    db.ensure(user.id, userStructure);
  },
  setInitiativeBonus: async function(user, newBonus){
    await db.defer;
    db.set(user.id, newBonus, "initiativeBonus");
  },
  getInitiativeBonus: async function(user){
    await db.defer;
    return(db.get(user.id, "initiativeBonus"));
  }

}
