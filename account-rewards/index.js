'use strict';   // dont touch
this.command = []; // dont touch
this.commandName = []; // dont touch
this.gamemodeId = []; // dont touch
this.gamemode = []; // dont touch
this.addToHelp = []; // dont touch

// [General]
this.name = "Auth-Rewards"; // Name of plugin REQUIRED
this.author = "Andrews54757"; // author REQUIRED
this.description = 'Reward system for logged in users'; // Desciprtion
this.compatVersion = ''; // compatable with (optional)
this.version = '1.0.0'; // version REQUIRED

// [Extra Commands]
this.commandName[0] = ""; // plugin add-on command names
this.addToHelp[0] = ""; // help command add-on (adds this string to the help command)
this.command[0] = ''; // extra command location

// [Extra Gamemodes]
this.gamemodeId[0] = ''; // gamemodeids of extra plugin gamemodes
this.gamemode[0] = ''; // gamemode location

// [Configs]
this.config = {
rewardspawnmass: 30,
rewardspeed: 0,
op: 0,
  
}
this.configfile = 'config.ini'


// [Functions]
this.init = function (gameServer, config) {
  this.config = config;
  if (gameServer.auon != 1) {
    console.log("[Awards] Auth plugin not detected");
  }
  gameServer.extraregpar = [];
  gameServer.extraregpar["spawnmass"] = this.config.rewardspawnmass;
  gameServer.extraregpar["speed"] = this.config.rewardspeed;
  if (this.config.op == 1) gameServer.extraregpar["op"] = 547; else gameServer.extraregpar["op"] = 0;
  gameServer.afterauth = function(player) {
    if (!player.guest && player.accountid) {
     var account = gameServer.account[player.accountid]
     player.spawnmass = account["spawnmass"];
     player.customspeed = account["speed"];
      gameServer.op[player.pID] = account.op;
    }
    
    
  }
  
  
  // init, Used to do stuff such as overriding things


};

this.onSecond = function (gameServer) {
  // called every second
};


module.exports = this; // dont touch
