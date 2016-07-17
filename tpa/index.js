'use strict'; // dont touch
this.command = []; // dont touch
this.commandName = []; // dont touch
this.gamemodeId = []; // dont touch
this.gamemode = []; // dont touch
this.addToHelp = []; // dont touch
var tpa;
// [General]
this.name = "TPA"; // Name of plugin REQUIRED
this.author = "LegitSoulja"; // author REQUIRED
this.description = 'Simple Teleportation'; // Desciprtion
this.compatVersion = ''; // compatable with (optional)
this.version = '1.0.0'; // version REQUIRED
this.commandName[0] = "tpa";
this.command[0] = function(gameServer, split) {
   if (split.length === 3) {
      if (isNaN(split[1]) || isNaN(split[2])) {
         console.log("Please specify ID's");
         return;
      }
      console.log("Teleporting..");
      tpa.tp(parseInt(split[1]), parseInt(split[2]));
   }
   else {
      console.log("Usage: tpa [id] [to id]");
      return;
   }
   return;
};
this.init = function(gameServer, config) {
   tpa = new teleport(gameServer, config);
};
var teleport = function(gameServer, config) {
   this.gameServer = gameServer;
   this.config = config;
};
teleport.prototype.tp = function(pid, id) {
   for (var players in tpa.gameServer.clients) {
      if (tpa.gameServer.clients.indexOf(id) > -1 || tpa.gameServer.clients.indexOf(pid) > -1) {
         console.log("Player doesn't exist");
         return;
      }
      else {
         //var player = tpa.gameServer.clients[pid].playerTracker;
         var client = tpa.gameServer.clients[players].playerTracker;
         if (client.pID == id) {
            //console.log("X > " + client.centerPos.x + " <> Y > " + client.centerPos.y);
            var ctp = ["tp", pid, client.centerPos.x, client.centerPos.y];
            tpa.gameServer.consoleService.execCommand("tp", ctp);
         }
      }
   }
};
module.exports = this; // dont touch
