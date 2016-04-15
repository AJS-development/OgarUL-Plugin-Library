'use strict';   // dont touch
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
plugin.commandName[0] = ""; // plugin add-on command names
plugin.addToHelp[0] = ""; // help command add-on (adds this string to the help command)
plugin.command[0] = ''; // extra command location

// [Extra Gamemodes]
plugin.gamemodeId[0] = ''; // gamemodeids of extra plugin gamemodes
plugin.gamemode[0] = ''; // gamemode location

// [Configs]
plugin.config = {
// config1: 0,
  
  
}
plugin.configfile = 'config.ini'


// [Functions]
plugin.init = function (gameServer, config) {
  this.config = config;
  
  // init, Used to do stuff such as overriding things


};

plugin.onSecond = function (gameServer) {

  // called every second
};


module.exports = plugin; // dont touch
