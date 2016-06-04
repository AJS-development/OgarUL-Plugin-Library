'use strict';   // dont touch
var plugin = []; // dont touch
this.command = []; // dont touch
this.commandName = []; // dont touch
this.gamemodeId = []; // dont touch
this.gamemode = []; // dont touch
this.addToHelp = []; // dont touch

// [General]
this.name = "GiveMeMinionsToo"; // Name of plugin REQUIRED
this.author = "AJS - Dev"; // author REQUIRED
this.description = 'Gives minions to people randomly'; // Desciprtion
this.compatVersion = ''; // compatable with (optional)
this.version = '1.0.0'; // version REQUIRED

// [Extra Commands]
this.commandName[0] = "gmm"; // plugin add-on command names
this.addToHelp[0] = "gmm      : Give me minions command"; // help command add-on (adds this string to the help command)
this.command[0] = function(gameServer,split) {
  if (split[1] == "power") {
    gameServer.GMMpower = !gameServer.GMMpower;
    var s = gameServer.GMMpower ? "on" : "off";
    console.log("[Console] Turned " + s + " plugin");
    return;
  } else if (split[1] = "kill") {
    try {
   clearTimeout(gameServer.intervalTM)
   console.log("[Console] Successevly forced killed give me minions");
   return;
   } catch (e) {
     console.log("[Console] Failed to kill the givememinions plugin")
     return;
   }
    
  } else {
    console.log("[Console] Please specify a command! Available: Power, Kill");
  }
  
  
  
}; // extra command location

// [Extra Gamemodes]
this.gamemodeId[0] = ''; // gamemodeids of extra plugin gamemodes
this.gamemode[0] = ''; // gamemode location

// [Configs]
this.config = {
switchIntervalTime: 10000,
minionGiveAmount: 30,
botGetMinions: 1,
setPerInterval:  2
  
  
}
this.configfile = 'config.ini'


// [Functions]
this.init = function (gameServer, config) {
  this.config = config;
  gameServer.intervalTM;
  gameServer.GMMpower = true;
  gameServer.gmpid = [];
  try {
    clearTimeout(gameServer.intervalTM);
  } catch (e) {
    // nothing
  }
  this.start(gameServer);
  console.log("[Console] Give me minions running!")
  // init, Used to do stuff such as overriding things


};
this.getrandom = function(gameServer) {
  var newrandom = [];
  var a = 0;
  for (var i in gameServer.clients) { // protection, just in case
    if (this.config.botGetMinions == 1 && gameServer.clients[i] && gameServer.gmpid.indexOf(gameServer.clients[i].playerTracker.pID) == -1 && !gameServer.clients[i].playerTracker.owner) {
    newrandom[a] = gameServer.clients[i].playerTracker;
    a ++;
    } else if (gameServer.clients[i].playerTracker.socket.remoteAddress && gameServer.clients[i] && gameServer.gmpid.indexOf(gameServer.clients[i].playerTracker.pID) == -1 && !gameServer.clients[i].playerTracker.owner) {
      newrandom[a] = gameServer.clients[i].playerTracker;
    a ++;
    }
  }
  var item = newrandom[Math.floor(Math.random()*newrandom.length)];
  return item;
}

this.start = function(gameServer) {
  var inttim = function() {
    
  gameServer.intervalTM = setTimeout(function() {
    gameServer.gmpid = [];
    if (gameServer.running && gameServer.GMMpower) {
    var nsplit = [];
    nsplit[1] = "destroy";
    gameServer.consoleService.execCommand("minion", nsplit);
    for (var i in gameServer.clients) if (gameServer.clients[i].owner) gameServer.clients[i].socket.close();
    setTimeout(function () {
    for (var i = 0; i<this.config.setPerInterval; i++) {
      var random = this.getrandom(gameServer)
      if (!random) break;
      gameServer.gmpid.push(random.pID)
      var nsplit = [];
      nsplit[1] = random.pID;
      nsplit[2] = this.config.minionGiveAmount;
      gameServer.consoleService.execCommand("minion", nsplit);
    }
    }.bind(this),800); 
    
    }
    inttim() // loop
  }.bind(this), this.config.switchIntervalTime)
  
  
  }.bind(this);
  inttim(); // startloop
}

this.onSecond = function (gameServer) {

  // called every second
};


module.exports = this; // dont touch
