
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

// [Functions]
plugin.init = function (gameServer) {
  // init, Used to do stuff such as overriding things


};

plugin.onSecond = function (gameServer) {

  // called every second
};


module.exports = plugin; // dont touch
