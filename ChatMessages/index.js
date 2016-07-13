'use strict';   // dont touch
this.command = []; // dont touch
this.commandName = []; // dont touch
this.gamemodeId = []; // dont touch
this.gamemode = []; // dont touch
this.addToHelp = []; // dont touch

// [General]
this.name = "ChatMessages"; // Name of plugin REQUIRED
this.author = "LegitSoulja"; // author REQUIRED
this.description = 'Periodic Chat Messages'; // Desciprtion
this.compatVersion = ''; // compatable with (optional)
this.version = '1.0.0'; // version REQUIRED

// INSERT PLUGIN BELOW
this.config = {
	enabled: 1,
	messageInterval: 60, // seconds 60 - 1 minute
	joinMessages: 1
}

this.configfile = "config.ini";

// stores player id's. When they die, join message wont repeat
var ids = [];
// [Functions]
this.init = function (gameServer, config) {
	this.gameServer = gameServer;
	this.config = config;
	
	// clear recent intervals
	if(typeof(gameServer.chatInterval) != "undefined"){
		clearInterval(gameServer.chatInterval);
	}
	
	// public
	gameServer.chatInterval;
	
	// start on fully load
	var to = setTimeout(function(){
		// try
		try{
			
			// load json
			var messages = require(__dirname + "/messages.json");
			
			// count messages
			var count = 0;
			for(var a in messages.messages){
				count++;
			}
			console.log("[ChatMessages] Loaded " + count + " Messages.");
			// start interval
			startMessaging(gameServer, config, messages, count);
		}catch(e){
			
			// error handler
			console.log("[ChatMessages] " + e);
			return;
		}
	}, 5000);
};
this.beforespawn = function(player){
	// send message function. This has to go first so player can spawn in the game before command execution.
	joinMessage(this.gameServer, this.config, player);
	
	// enable player to join
	return true;
}
var joinMessage = function(gameServer, config, player){
	// check if join message enabled
	if(parseInt(config.joinMessages) === 1){
		if(player.name && player.name.length > 1 && player.name != "" && player.name != " "){
			if(ids.indexOf(player.pID) > -1){
				// if player dies, but join back and his id is still the same, return.
				return;
			}else{
				// settimeout so there's time for when the player get into the game
				setTimeout(function(){
					// make sure player is not a bot!.
					if(typeof(player.socket.remoteAddress) != "undefined"){
						// grab json
						var j = require(__dirname + "/messages.json");
						
						// convert to string
						var message = j.joinmessage.toString();
						
						// create args
						var sendmsg = [];
						sendmsg[1] = "all";
						
						// replace {player} with player name
						sendmsg[2] = message.replace(/{player}/g, player.name);
						
						// send message
						gameServer.consoleService.execCommand("chat", sendmsg);
						ids.push(player.pID);
					}
					// 2 second timeout
				}, 2000);
			}
		}
	}
}
var startMessaging = function(gameServer, config, messages, msgcount){
	// set messages length
	var count = parseInt(msgcount);
	
	// start interval
	if(parseInt(config.enabled) === 1){
		gameServer.chatInterval = setInterval(function(){
			
			// get random message
			var randomMsg = Math.floor((Math.random() * count) + 0);
			
			// I couldnt figure out how to get the message, instead of an object so im doing it this way instead..
			var con = JSON.stringify(messages.messages[randomMsg]);
			var conr = con.replace("{", "").replace("}", "").replace(/"/g, "");
			var msg = conr.split(':');
			
			// send message
			var sendmsg = [];
			sendmsg[1] = "all";
			sendmsg[2] = msg[1];
			gameServer.consoleService.execCommand("chat", sendmsg);
		}, parseInt(config.messageInterval) * 1000); // seconds
	}
}
module.exports = this; // dont touch
