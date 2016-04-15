'use strict';   // dont touch
const fs = require('fs');
var auth = require('./auth.js');
var plugin = []; // dont touch
plugin.command = []; // dont touch
plugin.commandName = []; // dont touch
plugin.gamemodeId = []; // dont touch
plugin.gamemode = []; // dont touch
plugin.addToHelp = []; // dont touch

// [General]
plugin.name = "Auth"; // Name of plugin REQUIRED
plugin.author = "andrews54757"; // author REQUIRED
plugin.description = 'An auth plugin'; // Desciprtion
plugin.compatVersion = ''; // compatable with
plugin.version = '1.0.0'; // version REQUIRED

// [Extra Commands]
plugin.commandName[0] = "auth"; // plugin add-on command names
plugin.addToHelp[0] = "auth     : Auth plugin command"; // help command add-on (adds this string to the help command)
plugin.command[0] = require('./auth.js'); // extra command location

// [Extra Gamemodes]
plugin.gamemodeId[0] = ''; // gamemodeids of extra plugin gamemodes
plugin.gamemode[0] = ''; // gamemode location

// [Configs]
plugin.config = {
requirelogin: 0,
plugin: 1,
allowregister: 1,
}
plugin.configfile = 'config.ini'


// [Functions]
plugin.init = function (gameServer, config) {
  this.config = config;
  auth.init(plugin, gameServer);
  gameServer.beforespawn = function(player) {
    
    auth.beforespawn(player);
  };
  gameServer.beforeeject = function(player) {auth.beforeeject(player)};
  gameServer.beforesplit = function(player) {auth.beforesplit(player)};
  gameServer.account = JSON.parse(fs.readFileSync('accounts.json'));
  console.log("[Auth] Auth loaded")
  // init, Used to do stuff such as overriding things


};

plugin.onSecond = function (gameServer) {

  // called every second
};


module.exports = plugin; // dont touch
