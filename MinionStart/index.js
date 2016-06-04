
'use strict';   // dont touch
var plugin = []; // dont touch
this.command = []; // dont touch
this.commandName = []; // dont touch
this.gamemodeId = []; // dont touch
this.gamemode = []; // dont touch
this.addToHelp = []; // dont touch

// [General]
this.name = "Minion Start"; // Name of plugin REQUIRED
this.author = "Andrews54757"; // author REQUIRED
this.description = 'Gives minions on start'; // Desciprtion
this.compatVersion = ''; // compatable with (optional)
this.version = '1.0.0'; // version REQUIRED

// [Configs]
this.config = {
   numberOfMinions: 5,
   giveBotsMinions: 0,
   randomMinions: 0,
   randomMinimum: 1,
   randomMaximum: 10,
   minionName: "minion",
}
this.configfile = 'config.ini'


// [Functions]
this.init = function (gameServer, config) {
  this.config = config;
  this.gameServer = gameServer;
  // init, Used to do stuff such as overriding things


};

this.beforespawn = function(player) {
  if (!player.gotminions && !player.owner && (player.socket.remoteAddress || this.config.giveBotsMinions == 1)) {
    player.gotminions = true;
    var amount = this.config.numberOfMinions;
    if (this.config.randomMinions) {
      amount = Math.floor(Math.random() * this.config.randomMaximum) + this.config.randomMinimum
      
    }
    
    
    var c = [];
    c[1] = player.pID;
    c[2] = amount;
    c[3] = this.config.minionName;
    this.gameServer.consoleService.execCommand("minion", c)
    
    
  }
  
  return true;
}
this.onSecond = function (gameServer) {

  // called every second
};


module.exports = this; // dont touch
