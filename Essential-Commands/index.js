'use strict';   // dont touch
var plugin = []; // dont touch
this.command = []; // dont touch
this.commandName = []; // dont touch
this.gamemodeId = []; // dont touch
this.gamemode = []; // dont touch
this.addToHelp = []; // dont touch

// [General]
this.name = "Essential Commands"; // Name of plugin REQUIRED
this.author = "Andrews54757"; // author REQUIRED
this.description = 'Adds essential commands to ogar unlimited'; // Desciprtion
this.compatVersion = ''; // compatable with (optional)
this.version = '1.0.0'; // version REQUIRED

// [Extra Commands]
this.commandName[0] = "tptoplayer"; // plugin add-on command names
this.addToHelp[0] = "tptoplayer : tps to a player"; // help command add-on (adds this string to the help command)
this.command[0] = require('./tptoplayer.js'); // extra command location

this.commandName[1] = "unkick"; // plugin add-on command names
this.addToHelp[1] = "unkick     : Unkicks a player"; // help command add-on (adds this string to the help command)
this.command[1] = require('./unkick.js'); // extra command location

this.commandName[2] = "m"
this.command[2] =  function(gameServer, split) {
  gameServer.consoleService.execCommand("mass",split)
  
};// extra command location

this.commandName[3] = "pl"
this.command[3] = function(gameServer, split) {
  gameServer.consoleService.execCommand("playerlist",split)
  
};
this.commandName[4] = "s"
this.command[4] = function(gameServer, split) {
  gameServer.consoleService.execCommand("speed",split)
  
};
this.commandName[5] = "e"
this.command[5] = function(gameServer, split) {
  gameServer.consoleService.execCommand("explode",split)
  
};
this.commandName[6] = "sm"
this.command[6] = function(gameServer, split) {
  gameServer.consoleService.execCommand("spawnmass",split)
  
};
this.commandName[7] = "r"
this.command[7] = function(gameServer, split) {
  gameServer.consoleService.execCommand("merge",split)
  
};
this.commandName[8] = "t"
this.command[8] = function(gameServer, split) {
  gameServer.consoleService.execCommand("troll",split)
  
};


// [Extra Gamemodes]
this.gamemodeId[0] = ''; // gamemodeids of extra plugin gamemodes
this.gamemode[0] = ''; // gamemode location

// [Configs]
this.config = {
// config1: 0,
  
  
}
this.configfile = 'config.ini'


// [Functions]
this.init = function (gameServer, config) {
  this.config = config;
  
  // init, Used to do stuff such as overriding things


};

this.onSecond = function (gameServer) {

  // called every second
};


module.exports = this; // dont touch
