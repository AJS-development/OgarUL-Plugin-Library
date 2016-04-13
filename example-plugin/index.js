'use strict';
var plugin = [];
plugin.command = []; // extra commands
plugin.commandName = []; // extra commands
plugin.addToHelp = [];
plugin.gamemodeId = [];
plugin.gamemode = [];


plugin.name = "example plugin"; // Name of plugin where it would be listed in
plugin.author = "andrews54757"; // author
plugin.commandName[0] = "tptoplayer";
plugin.description = "An example plugin";
plugin.addToHelp[0] = "tptoplayer : tps to a player";
plugin.command[0] = require("./tptoplayer.js");
plugin.version = '1.0.0';
plugin.compatVersion = ''; // compatable with (todo)
plugin.gamemodeId[0] = 80;
plugin.gamemode[0] = require("./sffa.js");


plugin.init = function (gameServer, config) {
  this.config = config;
  // init, Used to do stuff such as overriding things


};
module.exports = plugin;

