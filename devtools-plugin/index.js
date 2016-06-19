'use strict';   // dont touch
var plugin = []; // dont touch
plugin.command = []; // dont touch
plugin.commandName = []; // dont touch
plugin.gamemodeId = []; // dont touch
plugin.gamemode = []; // dont touch
plugin.addToHelp = []; // dont touch

// [General]
plugin.name = "Devtools"; // Name of plugin
plugin.author = "andrews54757"; // author
plugin.description = 'Adds commands useful to devs'; // Desciprtion
plugin.compatVersion = ''; // compatable with (todo)
plugin.version = '1.0.0'; // version

// [Extra Commands]
plugin.commandName[0] = "dev"; // plugin add-on command names
plugin.addToHelp[0] = "dev        : Devtools plugin command"; // help command add-on (adds this string to the help command)
plugin.command[0] = require('./devtoolscmd.js'); // extra command location

plugin.commandName[1] = "console";
plugin.command[1] = require('./consolelogfinder.js');

plugin.commandName[2] = "combine";
plugin.command[2] = require('./combine.js');

// [Extra Gamemodes]
plugin.gamemodeId[0] = ''; // gamemodeids of extra plugin gamemodes
plugin.gamemode[0] = ''; // gamemode location

// [Functions]
plugin.init = function (gameServer) {
  // init, Used to do stuff such as overriding things


};

plugin.onSecond = function (gameServer) {

  // called every second
};


module.exports = plugin; // dont touch
