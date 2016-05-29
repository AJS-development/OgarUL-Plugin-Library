'use strict'; // dont touch
this.command = []; // dont touch
this.commandName = []; // dont touch
this.gamemodeId = []; // dont touch
this.gamemode = []; // dont touch
this.addToHelp = []; // dont touch
// [General]
this.name = "Statistics"; // Name of plugin REQUIRED
this.author = "LegitSoulja"; // author REQUIRED
this.description = 'Register Server Statistics'; // Desciprtion
this.compatVersion = ''; // compatable with (optional)
this.version = '1.0.1'; // version REQUIRED
this.addToHelp[1] = "stats      : Amounts of times your server updated stats";
this.commandName[1] = "stats";
this.command[1] = function(gameServer, config) {
    say("Checks > " + checks);
    return;
};
// INSERT PLUGIN BELOW
const fs = require('fs');
const http = require('http');
const request = require('request');
this.config = {
    serverName: "New Server",
    alerts: 1
};
this.configfile = 'config.ini';
var checks = 0;
var sendOut = {
    serverName: "New Server",
    serverBots: 0,
    serverPort: 0,
    gamemode: 0,
    statPort: 0,
    serverPlayers: 0,
    gameUID: "",
    recentPlayer: "null",
    ip: ""
};
var enabled = false;
// [Functions]
this.init = function(gameServer, config) {
    this.gameServer = gameServer;
    this.config = config;
    // check network
    require('dns')
        .resolve('www.google.com', function(err) {
            if (err) {
                say("No network connectivity for Statistics");
                return;
            }
        });
    checkUpdate(this.version, function(callback) {
        
        if (callback) {
            say("Preparing update..");
            var uc = [];
            uc[1] = "update";
            uc[2] = "Statistics";
            gameServer.consoleService.execCommand("plugin", uc);
            setTimeout(function(){
               
               say("Restarting..");
               process.exit(3);
               return;
                
            }, 3000);
            return;
            
        }else{
            
            say("No recent updates :)");
            enabled = true;
            function refresh() {
                getIP(function(callback) {
                    sendOut.ip = callback.toString();
                });
                getPlayers(gameServer, function(callback) {
                    sendOut.serverPlayers = callback;
                });
                getBots(gameServer, function(callback) {
                    sendOut.serverBots = callback;
                });
                sendOut.serverName = config.serverName;
                sendOut.gameUID = gameServer.uid;
                sendOut.serverPort = gameServer.config.serverPort;
                sendOut.statPort = gameServer.config.serverStatsPort;
                sendOut.gamemode = gameServer.config.serverGamemode;
                checkUpdate();
                setTimeout(function() {
                    //console.log(JSON.stringify({data: sendOut}));
                    request.post('http://stats.ogarul.tk/grab.php', {
                        form: {
                            hash: JSON.stringify({
                                data: sendOut
                            })
                        }
                    }, function(e, r, b) {
                        if (e) {
                            console.log("Could not send data");
                        }
                        else {
                            if (b) {
                                if (config.alerts === 1) {
                                    say(b);
                                }
                            }
                        }
                    });
                }, 5000);
                return;
            }
            setInterval(function() {
                refresh();
            }, 10000);
            refresh();
            
        }
    });
    
};
this.beforespawn = function(player) {
    if(enabled)
        if (typeof player.socket.remoteAddress != 'undefined') {
            sendOut.recentPlayer = player.name;
        }
        return true;
};
var checkUpdate = function(version, callback) {
    request("http://raw.githubusercontent.com/AJS-development/OgarUL-Plugin-Library/master/Statistics/version.json", function(e, r, b) {
        if(callback && typeof(callback) == 'function'){
            
        var parse = JSON.parse(b);
        if (parse.version !== version) {
            say("Found new update " + version + " > " + parse.version);
            return callback(true);
        }
        return callback(false);
            
        }
    });
};
var getPlayers = function(gameServer, callback) {
    var players = 0;
    for (var i in gameServer.clients) {
        if (typeof gameServer.clients[i].remoteAddress != 'undefined') {
            players++;
        }
    }
    return callback(players);
};
var getBots = function(gameServer, callback) {
    var bots = 0;
    for (var i in gameServer.clients) {
        if (typeof gameServer.clients[i].remoteAddress == 'undefined') {
            bots++;
        }
    }
    return callback(bots);
};
var getIP = function(callback) {
    request("http://stats.ogarul.tk/getip.php", function(e, r, b) {
        if (!e) {
            var p = JSON.parse(b);
            return callback(p.ip);
        }
    });
    return;
};
this.onsecond = function(gameServer) {};
var say = function(log, gameServer) {
    console.log("[Statistics] " + log);
    return;
};
module.exports = this; // dont touch
