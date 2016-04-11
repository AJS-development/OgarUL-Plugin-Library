
'use strict';   // dont touch
var plugin = []; // dont touch
plugin.command = []; // dont touch
plugin.commandName = []; // dont touch
plugin.gamemodeId = []; // dont touch
plugin.gamemode = []; // dont touch
plugin.addToHelp = []; // dont touch

// [General]
plugin.name = "Leaderboard Stats"; // Name of plugin REQUIRED
plugin.author = "Andrews54757"; // author REQUIRED
plugin.description = 'Adds stats to the end of the leaderboard'; // Desciprtion
plugin.compatVersion = ''; // compatable with (todo)
plugin.version = '1.0.0'; // version REQUIRED

// [Extra Commands]
plugin.commandName[0] = ""; // plugin add-on command names
plugin.addToHelp[0] = ""; // help command add-on (adds this string to the help command)
plugin.command[0] = ''; // extra command location

// [Extra Gamemodes]
plugin.gamemodeId[0] = ''; // gamemodeids of extra plugin gamemodes
plugin.gamemode[0] = ''; // gamemode location
plugin.stage = 0;
plugin.tick

// [Functions]
plugin.init = function (gameServer) {
  // init, Used to do stuff such as overriding things
console.log("[LBStats] Started up and enabled");



};

plugin.onSecond = function (gameServer) {
var lb = [];


if (plugin.stage == 0) {
  
  var humans = 0;
  var bots = 0;
  var minions = 0;
  gameServer.getClients().forEach((client)=> {
    
        if ('_socket' in client) {
          humans++;
        } else if (!client.playerTracker.owner) {
          bots++;
        } else {
          minions ++;
        }
      });
 var time = new Date().toISOString();
  time.replace(/T/, ' ').      // replace T with a space
  time.replace(/\..+/, '')
  lb[0] = "~~~~~~~~~~Stats~~~~~~~~~~";
  lb[1] = "Players: " + humans + "  Minions: " + minions;
  lb[2] = "Bots: " + bots + " Time: ";
  lb[3] = time;
  lb[4] = "~~~~~~~~~~~~~~~~~~~~~~~~~";
  if (plugin.tick > 7) {
    plugin.tick = 0;
    plugin.stage = 1;
    
  } else {
    plugin.tick ++;
  }
  
  
} else if (c == 1) {
  lb[0] = "~~~~~~~~~~Stats~~~~~~~~~~";
  lb[1] = "Highscore: " + Math.floor(gameServer.topscore);
  lb[2] = "By: " + gameServer.topusername;
  lb[3] = "Old HS Holder: " + Math.floor(gameServer.oldtopscores.score);
  lb[4] = "~~~~~~~~~~~~~~~~~~~~~~~~~";
  
  if (plugin.tick > 7) {
    plugin.tick = 0;
    plugin.stage = 0;
    
  } else {
    plugin.tick ++;
  }
  
  
  
  
} else {
  plugin.stage = 0;
  
  
}




gameServer.customLBEnd = lb;
  // called every second
};


module.exports = plugin; // dont touch
