'use strict';   // dont touch
this.command = []; // dont touch
this.commandName = []; // dont touch
this.gamemodeId = []; // dont touch
this.gamemode = []; // dont touch
this.addToHelp = []; // dont touch

// [General]
this.name = "Anti-Bot"; // Name of plugin REQUIRED
this.author = "LegitSoulja"; // author REQUIRED
this.description = 'Anti-Bot Official'; // Desciprtion
this.compatVersion = ''; // compatable with (optional)
this.version = '1.0.2'; // version REQUIRED

// stores sockets from txt file
var sockets = [];
// stores your blocked names
var blockedNames = [];
// stores denied user agents. Most commonly used by bots
var us = [
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:30.0) Gecko/20100101 Firefox/30.0"
]

this.config = {
	ipLimit: 1,
	blockedNames: ""
}

this.configfile = "config.ini";
this.init = (gameServer, config) => {
	this.gameServer = gameServer;
	this.config = config;
	loadSockets();
	loadBlockedNames(config);
};
function loadBlockedNames(config){
	var bn = config.blockedNames.split(",");
	for(var i in bn){
		if(bn[i]){
			blockedNames.push(bn[i].toLowerCase());
		}
	}
}
function loadSockets(){
	require("fs").readFile(__dirname + "/sockets.txt", function(e,b){
		if(!e){
			b = b.toString('utf-8'); // convert from bytes
			var socks = b.split("\r\n");
			for(var i in socks){
				var o = socks[i].split(":");
				if(o[0]){
					sockets.push(o[0]);
				}
			}
		}
	});
}
this.beforespawn = (player) => { 
	try{
		
		if(typeof(player.socket.remoteAddress) == 'undefined'){
			return true; // temporary fix for bots and minions.
		}
		
		var i = player.socket.upgradeReq.headers;
		i = JSON.stringify(i);
		i = i.replace("user-agent", "useragent");
		i = JSON.parse(i);
		
		// checks user agents
		for(var i in us){
			if(us[i]){
				if(i.useragent == us[i]){
					this.gameServer.pm(player.pID, "This user agent is not allowed!.", "[Anti-Bot]");
					console.log("[Anti-Bot] Stopped bot with header > " + us[i]);
					player.socket.close();
					return false;
				}
			}
		}
		
		// checks if socket from text file matches
		if(sockets.indexOf(player.socket.remoteAddress) > -1){
			this.gameServer.pm(player.pID, "Eww, Get away you pest!.", "[Anti-Bot]");
			console.log("[Anti-Bot] Stopped bot > " + player.socket.remoteAddress + " > " + player.name);
			player.socket.close();
			return false;
		}
		
		// lowercase player name, ignore case sensitivity.
		var name = player.name.toLowerCase();
		
		// check blocked names.
		if(blockedNames.indexOf(name) > -1){
			this.gameServer.pm(player.pID, "Welp, Your name prevents you to join this server", "[Anti-Bot]");
			console.log("[Anti-Bot] Stopped bot > " + player.socket.remoteAddress + " > " + player.name);
			player.socket.close();
			return false;
		}
		let limit = 0;
		
		// get ip in-game duplicates
		for(var i in this.gameServer.clients){
			var o = this.gameServer.clients[i].playerTracker;
			if(o.socket.remoteAddress == player.socket.remoteAddress){
				limit++;
			}
		}
		
		// finish up the limits
		if(limit != 0 && limit > this.config.ipLimit){
			this.gameServer.pm(player.pID, "Only 1 player per IP can join!.", "[Anti-Bot]");
			player.socket.close();
			return false;
		}
		// if player passes, return true;
		return true;
	}catch(e){
		// error log , incase something happens. (Packet errors are annoying if you ever make a plugin. You'll understand)
		console.log(e);
		console.log("Report above error-message too LegitSoulja");
	}
};

module.exports = this; // dont touch
