'use strict';   // dont touch
const fs = require('fs');
var auth = require('./auth.js');
this.command = []; // dont touch
this.commandName = []; // dont touch
this.gamemodeId = []; // dont touch
this.gamemode = []; // dont touch
this.gameServer;
this.addToHelp = []; // dont touch

// [General]
this.name = "Auth"; // Name of plugin REQUIRED
this.author = "andrews54757"; // author REQUIRED
this.description = 'An auth plugin'; // Desciprtion
this.compatVersion = '16.1.5'; // compatable with
this.version = '1.2.0'; // version REQUIRED

// [Extra Commands]
this.commandName[0] = "auth"; // plugin add-on command names
this.addToHelp[0] = "auth       : Auth plugin command"; // help command add-on (adds this string to the help command)
this.command[0] = require('./command.js'); // extra command location

// [Extra Gamemodes]
this.gamemodeId[0] = ''; // gamemodeids of extra plugin gamemodes
this.gamemode[0] = ''; // gamemode location

// [Configs]
this.config = {
requirelogin: 0,
plugin: 1,
allowregister: 1,
kicktime: 20,
recordint: 100,
reservename: 0,
hidelogin: 0,
}
this.configfile = 'config.ini'


// [Functions]
this.init = function (gameServer, config) {
  this.config = config;
  this.gameServer = gameServer;
  auth.init(this, gameServer);
  gameServer.onregister = function(player) {
    return;
    
  };
  gameServer.extraregpar = [];
  gameServer.afterauth = function(player) {
    
    
  };
  try {
  gameServer.account = JSON.parse(fs.readFileSync('accounts.json'));
  } catch (e) {
    fs.writeFileSync('accounts.json', '[]');
    gameServer.account = [];
  }
  gameServer.auon = this.config.plugin;
  console.log("[Auth] Auth loaded. Accounts located in accounts.json")
  // init, Used to do stuff such as overriding things


};

 this.beforespawn = function(player) {
    
   return auth.beforespawn(player,this.gameServer);
  };
  this.beforeq = function(player) {
    return auth.beforeq(player, this.gameServer);
    
  };
  this.beforeeject = function(player) {return auth.beforeeject(player,this.gameServer);};
  this.beforesplit = function(player) {return auth.beforesplit(player,this.gameServer);};

this.onSecond = function (gameServer) {
  if (gameServer.auon == 1 && this.config.recordint > 0) {
if (!this.up) this.up = 0;
if (this.up < this.config.recordint) {
  this.up ++;
  
} else {
  this.up = 0;
  fs.writeFile('accounts.json',JSON.stringify(gameServer.account, null, 2), (err) => {
  if (err) throw err;
});
}
}

  // called every second
};


module.exports = this; // dont touch
