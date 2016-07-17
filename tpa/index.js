'use strict'; // dont touch
this.command = []; // dont touch
this.commandName = []; // dont touch
this.gamemodeId = []; // dont touch
this.gamemode = []; // dont touch
this.addToHelp = []; // dont touch
// [General]
this.name = "TPA"; // Name of plugin REQUIRED
this.author = "LegitSoulja"; // author REQUIRED
this.description = 'Simple Teleportation'; // Desciprtion
this.compatVersion = ''; // compatable with (optional)
this.version = '1.0.0'; // version REQUIRED
this.commandName[0] = "tpa";
this.command[0] = function(gameServer, split) {
   if (split.length === 3) {
      var pid = parseInt(split[1]);
      var id = parseInt(split[2]);
      if (isNaN(pid) || isNaN(id)) {
         console.log("Please specify ID's");
         return;
      }
      console.log("Teleporting");
      for (var p in gameServer.clients) {
         if (gameServer.clients.indexOf(pid) > -1 && gameServer.clients.indexOf(id) > -1) {
            console.log("Player(s) isn't in game to be teleported!.");
            return;
         }
         else {
            var client = gameServer.clients[p].playerTracker;
            if (client.pID == id) {
               var ctp = ["tp", parseInt(split[1]), client.centerPos.x, client.centerPos.y];
               gameServer.consoleService.execCommand("tp", ctp);
            }
         }
      }
   }
   else {
      console.log("Usage: tpa [id] [toid]");
      return;
   }
};
this.init = function(gameServer, config) {};
module.exports = this; // dont touch
