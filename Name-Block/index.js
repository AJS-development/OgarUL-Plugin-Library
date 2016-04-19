'use strict';   // dont touch
const fs = require('fs');
this.command = []; // dont touch
this.commandName = []; // dont touch
this.gamemodeId = []; // dont touch
this.gamemode = []; // dont touch
this.addToHelp = []; // dont touch

// [General]
this.name = "Name-Block"; // Name of plugin REQUIRED
this.author = "Andrews54757"; // author REQUIRED
this.description = 'blocks certian nicknames'; // Desciprtion
this.compatVersion = ''; // compatable with (optional)
this.version = '1.0.0'; // version REQUIRED

// [Extra Commands]
this.commandName[0] = ""; // plugin add-on command names
this.addToHelp[0] = ""; // help command add-on (adds this string to the help command)
this.command[0] = ''; // extra command location

// [Extra Gamemodes]
this.gamemodeId[0] = ''; // gamemodeids of extra plugin gamemodes
this.gamemode[0] = ''; // gamemode location
this.blockednames;

// [Configs]
this.config = {
// config1: 0,
  
  
}
this.configfile = 'config.ini'


// [Functions]
this.init = function (gameServer, config) {
  this.config = config;
  try {
    var load = fs.readFileSync('blockednames.txt')
    
  } catch {
    fs.writeFileSync('blockednames.txt', '');
  }
  // init, Used to do stuff such as overriding things


};

this.onSecond = function (gameServer) {

  // called every second
};


module.exports = this; // dont touch
