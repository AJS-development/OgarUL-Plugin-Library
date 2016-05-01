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
this.gameServer;

// [Extra Commands]
this.commandName[0] = "nameblock"; // plugin add-on command names
this.addToHelp[0] = "nameblock    : Nameblock plugin command"; // help command add-on (adds this string to the help command)
this.command[0] = function (gameServer, split) {
  var c = split[1];
  if (c == 'power') {
  if (gameServer.nameblock) {
  gameServer.nameblock = false;
  console.log("[Console] Turned off plugin");
  return;
  } else {
    gameServer.nameblock = true;
  console.log("[Console] Turned on plugin");
  return;
  }
  }
  if (!gameServer.nameblock) {
    console.log("[Console] Turn on plugin first");
    return;
  }
  if (c == 'reload') {
    var load = '';
  try {
   load = fs.readFileSync('./blockednames.txt', 'utf8').split(/[\r\n]+/).filter(function (x) {
      return x != ''; // filter empty names
    }); 
  } catch (e) {
    fs.writeFileSync('blockednames.txt', '');
  }
    
    gameServer.blockednames = load;
    console.log("[Console] Reloaded blocked names");
  } else if (c == 'add') {
    if (!split[2]) {
      console.log("[Console] Please specify a name");
      return;
    }
    gameServer.blockednames.push(split[2]);
    console.log("[Console] Added " + split[2] + " to the blocked name list");
  } else {
    console.log("[Console] Please specify a command, reload, power, add");
  
  
  }
}; // extra command location

// [Extra Gamemodes]
this.gamemodeId[0] = ''; // gamemodeids of extra plugin gamemodes
this.gamemode[0] = ''; // gamemode location
this.blockednames;

// [Configs]
this.config = {
preservecase: 0,
  
  
};
this.configfile = 'config.ini';


// [Functions]
this.init = function (gameServer, config) {
  gameServer.nameblock = true;
  this.config = config;
  gameServer.preservec = this.config.preservecase;
  this.gameServer = gameServer;
  
  var load = '';
  try {
   load = fs.readFileSync('./blockednames.txt', 'utf8').split(/[\r\n]+/).filter(function (x) {
      return x != ''; // filter empty names
    }); 
  } catch (e) {
    fs.writeFileSync('blockednames.txt', '');
  }
    gameServer.blockednames = load;
  
  // init, Used to do stuff such as overriding things
console.log("[NameBlock] Loaded and file is in src/blockednames.txt");

};
this.beforespawn = function (player) {
  if (!this.gameServer.nameblock) return true;
  if (!player.name) return true;
  if (this.gameServer.preservec == 1) {
    for (var i in this.gameServer.blockednames) {
    if (player.name.indexOf(this.gameServer.blockednames[i]) != -1) return false;
    
    }
  } else {
    
    var n = player.name.toLowerCase();
    for (var i in this.gameServer.blockednames) {
      if (n.indexOf(this.gameServer.blockednames[i]) != -1) return false;
    }
    
  }
  return true;
};

this.onSecond = function (gameServer) {
  
  // called every second
};


module.exports = this; // dont touch
