
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
this.version = '1.0.1'; // version REQUIRED

var sockets = [];
var blockedNames = [];
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
	require("fs").readFile(__dirname + "/sockets.txt", function(e,b){
		if(!e){
			b = b.toString();
			var socks = b.split("\r\n");
			for(var i in socks){
				var o = socks[i].split(":");
				if(o[0]){
					sockets.push(o[0]);
				}
			}
		}
	});
	var bn = config.blockedNames.split(",");
	for(var i in bn){
		if(bn[i]){
			blockedNames.push(bn[i].toLowerCase());
		}
	}
};
this.beforespawn = (player) => { 
try{
	var i = player.socket.upgradeReq.headers;
	i = JSON.stringify(i);
	i = i.replace("user-agent", "useragent");
	i = JSON.parse(i);
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
	// checks if socket matches
	if(sockets.indexOf(player.socket.remoteAddress) > -1){
		this.gameServer.pm(player.pID, "Eww, Get away you pest!.", "[Anti-Bot]");
		console.log("[Anti-Bot] Stopped bot > " + player.socket.remoteAddress + " > " + player.name);
		player.socket.close();
		return false;
	}
	// check name
	var name = player.name.toLowerCase();
	console.log(name);
	
	if(blockedNames.indexOf(name) > -1){
		this.gameServer.pm(player.pID, "Welp, Your name prevents you to join this server", "[Anti-Bot]");
		console.log("[Anti-Bot] Stopped bot > " + player.socket.remoteAddress + " > " + player.name);
		player.socket.close();
		return false;
	}
	let limit = 0;
	for(var i in this.gameServer.clients){
		var o = this.gameServer.clients[i].playerTracker;
		if(o.socket.remoteAddress == player.socket.remoteAddress){
			limit++;
		}
	}
	if(limit != 0 && limit > this.config.ipLimit){
		this.gameServer.pm(player.pID, "Only 1 player per IP can join!.", "[Anti-Bot]");
		player.socket.close();
		return false;
	}
	return true;
}catch(e){
	console.log(e);
}
};

module.exports = this; // dont touch
