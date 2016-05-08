'use strict';   // dont touch
var plugin = []; // dont touch
this.command = []; // dont touch
this.commandName = []; // dont touch
this.gamemodeId = []; // dont touch
this.gamemode = []; // dont touch
this.addToHelp = []; // dont touch

// [General]
this.name = "Super Minions"; // Name of plugin REQUIRED
this.author = "Andrews54757"; // author REQUIRED
this.description = 'Adds minions with powers'; // Desciprtion
this.compatVersion = '16.3.8'; // compatable with (optional)
this.version = '1.0.0'; // version REQUIRED

// [Extra Commands]
this.commandName[2] = "superminion"
this.addToHelp[2] = "superminion: Minions with powers";
this.command[2] = require('./super.js')

// [Extra Gamemodes]
this.gamemodeId[0] = ''; // gamemodeids of extra plugin gamemodes
this.gamemode[0] = ''; // gamemode location

// [Configs]
this.config = {
// config1: 0,
  
  
}


// [Functions]
this.init = function (gameServer, config) {
  this.config = config;
  
  
  
  
  // init, Used to do stuff such as overriding things

};

this.onaddminion = function(gameServer, fakeSocket, arg, th) {
  try{
  if (arg) {
  fakeSocket.playerTracker.spawnmass = arg[34];
  
  fakeSocket.playerTracker.customspeed = arg[43];
  }
  } catch (e) {
    
  }
  
};

this.onSecond = function (gameServer) {

  // called every second
};


module.exports = this; // dont touch
