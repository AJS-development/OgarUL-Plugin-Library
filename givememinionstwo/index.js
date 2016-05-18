'use strict';   // dont touch
var plugin = []; // dont touch
this.command = []; // dont touch
this.commandName = []; // dont touch
this.gamemodeId = []; // dont touch
this.gamemode = []; // dont touch
this.addToHelp = []; // dont touch

// [General]
this.name = ""; // Name of plugin REQUIRED
this.author = ""; // author REQUIRED
this.description = ''; // Desciprtion
this.compatVersion = ''; // compatable with (optional)
this.version = ''; // version REQUIRED

// [Extra Commands]
this.commandName[0] = ""; // plugin add-on command names
this.addToHelp[0] = ""; // help command add-on (adds this string to the help command)
this.command[0] = ''; // extra command location

// [Extra Gamemodes]
this.gamemodeId[0] = ''; // gamemodeids of extra plugin gamemodes
this.gamemode[0] = ''; // gamemode location

// [Configs]
this.config = {
switchIntervalTime: 10000,
minionGiveAmount: 30,
botGetMinions: 1,
setPerInterval:  2
  
  
}
this.configfile = 'config.ini'


// [Functions]
this.init = function (gameServer, config) {
  this.config = config;
  gameServer.intervalTM;
  gameServer.gmpid = [];
  console.log("[Console] Give me minions running!")
  // init, Used to do stuff such as overriding things


};

this.onSecond = function (gameServer) {

  // called every second
};


module.exports = this; // dont touch
