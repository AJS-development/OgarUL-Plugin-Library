
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
plugin.commandName[0] = "customlb"; // plugin add-on command names
plugin.addToHelp[0] = "customLB   : lB Stats plugin command"; // help command add-on (adds this string to the help command)
plugin.command[0] = require('./command.js'); // extra command location

// [Extra Gamemodes]
plugin.gamemodeId[0] = ''; // gamemodeids of extra plugin gamemodes
plugin.gamemode[0] = ''; // gamemode location
plugin.stage = 0;
plugin.tick = 0;

plugin.config = {
  showstats: 0,
  
  
}

plugin.configfile = 'config.ini';


// [Functions]
plugin.init = function (gameServer, config) {
  this.config = config;
  // init, Used to do stuff such as overriding things
console.log("[LBStats] Started up and enabled. Use the CustomLB command to interact with this plugin");
if (config.showstats != 1) {
console.log("[LBStats] Stats are not turned on, do customlb stats to turn it on");
gameServer.LBSPS = false;
} else {
  
  gameServer.LBSPS = true;
}
gameServer.extraLBcustom = '';
gameServer.eLBCDuration = 0;
gameServer.LBSP = true;

};

plugin.onSecond = function (gameServer) {
if (gameServer.LBSP) {
var lb = [];

if (gameServer.LBSPS) {
   var alive = 0;
  var bots = 0;
  var spectators = 0;
  var minions = 0;
  gameServer.getClients().forEach((client)=> {
    
        if ('_socket' in client) {
          if (client.cells > 0) alive++; else spectators++;
        } else if (!client.playerTracker.owner) {
          bots++;
        } else {
          minions ++;
        }
      });
if (plugin.stage == 0) {
  
 var time = new Date().toISOString();
 var ttime = time.replace(/T/, ' ');     // replace T with a space
time = ttime.replace(/\..+/, '');
  lb[0] = "~~~~~Stats~~~~~";
  lb[1] = "Alive: " + alive;
  lb[2] = "Minions: " + minions;
  lb[3] = "Bots: " + bots + " Time: ";
  lb[4] = time;
  lb[5] = "~~~~~~~~~~~~~~~";
  if (plugin.tick > 5) {
    plugin.tick = 0;
    plugin.stage = 1;
    
  } else {
    if (isNaN(plugin.tick)) plugin.tick = 1;
    plugin.tick ++;
  }
  
  
} else if (plugin.stage == 1) {
  lb[0] = "~~~~~Stats~~~~~";
  lb[1] = "Spectators: " + spectators;
  lb[2] = "Highscore: " + Math.floor(gameServer.topscore);
  lb[3] = "By: " + gameServer.topusername;
  lb[4] = "Prev: " + gameServer.oldtopscores.name;
  lb[5] = "~~~~~~~~~~~~~~~";
  
  if (plugin.tick > 5) {
    plugin.tick = 0;
    plugin.stage = 0;
    
  } else {
    plugin.tick ++;
  }
  
  
  
  
} else {
  plugin.stage = 0;
  
  
}
} else {
  lb = [];
  
}

if (gameServer.eLBCDuration > 0) {
lb = gameServer.extraLBCustom;
if (gameServer.eLBCDuration < 1) {
  gameServer.eLBCDuration = 0;
  gameServer.extraLBCustom = [];
} 
if (isNaN(gameServer.eLBCDuration)) gameServer.eLBCDuration = 1;
  gameServer.eLBCDuration--;
}


gameServer.customLBEnd = lb;
  // called every second
} else {
  
  gameServer.customLBEnd = [];
}
};


module.exports = plugin; // dont touch
