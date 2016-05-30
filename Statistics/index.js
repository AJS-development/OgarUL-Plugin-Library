'use strict'; // dont touch
const fs = require('fs');
const http = require('http');
const request = require('request');
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
this.version = '1.0.3'; // version REQUIRED
this.addToHelp[1] = "stats [create, delete, optout]     : Amounts of times your server updated stats";
this.commandName[1] = "stats";
this.command[1] = function(gameServer, split) {
    var first = split[1].toLowerCase();
    switch (first) {
        case "create":
            say("red", "You just poned to add this server");
            create(gameServer, gameServer.config);
            return true;
        case "optout":
            say("red", "To opt out change the config in ./settings/Statistics/config.ini > 'optout' = '1'");
            return true;
        case "delete":
            say("red", "You have deleted your server statistics");
            deletes(gameServer, gameServer.config);
            gameServer.senabled = false;
            return true;
        case "abort":
            say("red", "DELETING ALL STATISTICS AND STATISTICS DATA");
            deletes(gameServer, gameServer.config);
            say("red", "WAITING FOR CALLBACK TO FINISH");
            setTimeout(function() {
                say("red", "DELETING PLUGIN");
                var d = [];
                d[1] = "delete";
                d[2] = "Statistics";
                say("red", "GOOD-BYE :(");
                gameServer.consoleService.execCommand("plugin", d);
                return;
            }, 5000);
            return;
    }
    say("cyan", "Usage: stats [create, delete, optout]");
    return false;
};
// INSERT PLUGIN BELOW
this.config = {
    serverName: "New Server",
    alerts: 1,
    usevpsip: 1,
    customip: "",
    optout: 0,
    clientlink: "",
    // development
    debug: 0,
};
this.configfile = 'config.ini';
var sendOut = {
    serverName: "New Server",
    serverBots: 0, // dynamic
    serverPort: 0, // static
    gamemode: 0, // dynamic
    statPort: 0, // static
    serverPlayers: 0, // dynamic
    gameUID: "", // static
    recentPlayer: "", // dynamic
    ip: "", // dynamic
    uptime: 0, // dynamic
    remove: "", // static
    clientlink: "", // dynamic
    // new things thats coming
};
module.exports = sendOut;
// [Functions]
this.init = function(gameServer, config) {
    this.gameServer = gameServer;
    this.config = config;
    gameServer.schecks = 0;
    // dynamic
    sendOut.gameUID = gameServer.uid;
    sendOut.serverPort = gameServer.config.serverPort;
    sendOut.ip = config.customip;
    sendOut.statPort = gameServer.config.serverStatsPort;
    sendOut.clientlink = config.clientlink;
    sendOut.serverName = config.serverName;
    // check network
    /*
    checkNetwork(function(callback) {
        if (!callback) {
            say("Cannot be used with no network connectivity");
        }
    });
    */
    require('dns')
        .resolve('www.google.com', function(err) {
            if (err) {
                say("red", "No network connectivity for Statistics");
                return;
            }
        });
    if (this.config.optout === 1) {
        deletes(gameServer);
        return;
    }
    checkUpdate(this.version, function(callback) {
        if (callback) {
            say("cyan", "Preparing update..");
            var uc = [];
            uc[1] = "update";
            uc[2] = "Statistics";
            gameServer.consoleService.execCommand("plugin", uc);
            setTimeout(function() {
                say("green", "Restarting...");
                process.exit(3);
                return;
            }, 3000);
            return;
        }
        else {
            say("cyan", "No recent updates :)" + "\r\n" + "{" + "\r\n" + "\x1b[32mServer Name\x1b[0m: " + config.serverName + "\r\n" + "\x1b[32mServer Ip\x1b[0m: " + config.customip +
                "\r\n" + "{" + "\r\n");
            gameServer.senabled = true;
            setInterval(function() {
                create(gameServer, config);
            }, 10000);
            setTimeout(function() {
                create(gameServer, config);
            }, 2000);
        }
    });
};
this.beforespawn = function(player) {
    if (true)
        if (typeof player.socket.remoteAddress != 'undefined') {
            sendOut.recentPlayer = player.name;
        }
    return true;
};
var checkNetwork = function(callback) {
    // 
};
// delete server stats
var deletes = function(gameServer) {
        console.log("opt out");
        var r = {
            remove: sendOut.gameUID,
        };
        sendOut.remove = gameServer.uid;
        request.post('http://stats.ogarul.tk/grab.php', {
            form: {
                hash: JSON.stringify({
                    data: sendOut
                })
            }
        }, function(e, r, b) {
            if (!e) {
                console.log("good");
                console.log(JSON.stringify({
                    data: sendOut
                }));
                console.log(b);
            }
            else {
                console.log(e);
            }
        });
        return;
    }
    // create // refresh // update servers stats
var create = function(gameServer, config) {
        if (gameServer.senabled) {
            sendOut.gamemode = gameServer.config.serverGamemode;
            sendOut.serverName = config.serverName;
            getIP(gameServer, config.usevpsip, function(callback) {
                if (!callback) {
                    say("red", "Could not update server ip");
                }
                else {
                    sendOut.ip = callback;
                }
            });
            getPlayers(gameServer, function(callback) {
                sendOut.serverPlayers = callback;
            });
            getBots(gameServer, function(callback) {
                sendOut.serverBots = callback;
            });
            setTimeout(function() {
                if (config.debug === 1) {
                    console.log("[Statistics DEBUG---------------------------------------------------------]" + "\r\n" + JSON.stringify({
                        data: sendOut
                    }) + "\r\n" + "[END----------------------------------------------------------------------]");
                }
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
                        gameServer.schecks++;
                        if (b) {
                            if (config.alerts === 1) {
                                say("cyan", b);
                            }
                        }
                    }
                });
            }, 5000);
            return;
        }
    }
    // check for updates
var checkUpdate = function(version, callback) {
    request("http://raw.githubusercontent.com/AJS-development/OgarUL-Plugin-Library/master/Statistics/version.json", function(e, r, b) {
        var parse = JSON.parse(b);
        if (callback && typeof(callback) == 'function') {
            if (parse.version !== version) {
                say("green", "Found new update " + version + " > " + parse.version);
                return callback(true);
            }
            return callback(false);
        }
    });
};
// Get Server Players 
var getPlayers = function(gameServer, callback) {
    var players = 0;
    for (var i in gameServer.clients) {
        if (typeof gameServer.clients[i].remoteAddress != 'undefined') {
            players++;
        }
    }
    return callback(players);
};
// Get Server bots
var getBots = function(gameServer, callback) {
    var bots = 0;
    for (var i in gameServer.clients) {
        if (typeof gameServer.clients[i].remoteAddress == 'undefined') {
            bots++;
        }
    }
    return callback(bots);
};
// Get VPS IP
var getIP = function(gameServer, enable, callback) {
    if (callback && typeof(callback) == "function") {
        if (enable == 1) {
            request("http://stats.ogarul.tk/getip.php", function(e, r, b) {
                if (!e) {
                    var p = JSON.parse(b);
                    sendOut.ip = p.ip;
                    return callback(p.ip);
                }
                else {
                    say("red", "Could not get vps ip");
                    return;
                }
            });
        }
        return;
    }
};
var say = function(color, log) {
    var head = "Statistics";
    switch (color) {
        case "red":
            console.log("[" + "\x1b[31m" + head + "\x1b[0m" + "] " + log);
            return;
        case "green":
            console.log("[" + "\x1b[32m" + head + "\x1b[0m" + "] " + log);
            return;
        case "cyan":
            console.log("[" + "\x1b[36m" + head + "\x1b[0m" + "] " + log);
            return;
        case "cmd":
            console.log("\x1b[30m" + "[" + "\x1b[32m\x1b[5m" + "OgarCMD" + "\x1b[30m" + "]" + "\x1b[0m" + log);
            return;
        default:
            console.log("\x1b[32m" + "[" + "\x1b[37m" + head + "\x1b[32m" + "]" + "\x1b[0m " + log);
            return;
            return;
    }
    return;
};
module.exports = this; // dont touch