
'use strict';   // dont touch
var plugin = []; // dont touch
this.command = []; // dont touch
this.commandName = []; // dont touch
this.gamemodeId = []; // dont touch
this.gamemode = []; // dont touch
this.addToHelp = []; // dont touch

// [General]
this.name = "Permissions solver"; // Name of plugin REQUIRED
this.author = "Andrews54757"; // author REQUIRED
this.description = 'Solves the permissions issue'; // Desciprtion
this.compatVersion = ''; // compatable with (optional)
this.version = '1.0.0'; // version REQUIRED

// [Extra Commands]
this.commandName[0] = "unlock"; // plugin add-on command names
this.addToHelp[0] = "unlock    : Unlocks a file."; // help command add-on (adds this string to the help command)
this.command[0] = require('./unlock.js'); // extra command location

// [Configs]
this.config = {
// config1: 0,
  
  
}


// [Functions]
this.init = function (gameServer, config) {

  
  // init, Used to do stuff such as overriding things


};

this.onSecond = function (gameServer) {

  // called every second
};


module.exports = this; // dont touch
