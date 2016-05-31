'use strict'; // dont touch
const fs = require('fs');
const http = require('http');
const request = require('request');
const WebSocket = require('ws');
this.command = []; // dont touch
this.commandName = []; // dont touch
this.gamemodeId = []; // dont touch
this.gamemode = []; // dont touch
this.addToHelp = []; // dont touch
// [General]
this.name = "Statistics"; // Name of plugin REQUIRED
this.author = "LegitSoulja"; // author REQUIRED
this.description = 'OgarUL Server Statistics List Plugin'; // Desciprtion
this.compatVersion = ''; // compatable with (optional)
this.version = '1.0.5'; // version REQUIRED
this.commandName[1] = "stats";
this.addToHelp[1] = "\x1b[36mstats\x1b[0m [\x1b[36mcreate, delete, optout, enable, disable, refresh\x1b[0m]     : Statistics";
this.addToHelp[2] = "\x1b[36mstats\x1b[0m [\x1b[32mcreate\x1b[0m] | Creates a new statistcs for ogarul server list.";
this.addToHelp[3] = "\x1b[36mstats\x1b[0m [\x1b[31mdelete\x1b[0m] | Delete your statistics from ogarul server list.";
this.addToHelp[4] = "\x1b[36mstats\x1b[0m [\x1b[31moptout\x1b[0m] | Opt-Out instructions.";
this.addToHelp[5] = "\x1b[36mstats\x1b[0m [\x1b[32menable\x1b[0m] | Enable Statistics updates.";
this.addToHelp[6] = "\x1b[36mstats\x1b[0m [\x1b[31mdisable\x1b[0m] | Disable Statistics updates.";
this.addToHelp[7] = "\x1b[36mstats\x1b[0m [\x1b[32mrefresh\x1b[0m] | Refresh your server Statistics.";
// INSERT PLUGIN BELOW
var sendOut;
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
// [Functions]
this.init = function(gameServer, config) {
    //getPing(gameServer);
    this.gameServer = gameServer;
    this.config = config;
    gameServer.schecks = 0;
    sendOut = {
        serverName: config.serverName, // static
        serverBots: 0, // dynamic
        serverPort: gameServer.config.serverPort, // static
        gamemode: 0, // dynamic
        statPort: gameServer.config.serverStatsPort, // static
        serverPlayers: 0, // dynamic
        gameUID: gameServer.uid, // static
        recentPlayer: "", // dynamic
        ip: config.customip, // dynamic
        uptime: 0, // dynamic
        remove: "", // dynamic
        clientlink: config.clientlink, // static
        // new things thats coming
        version: gameServer.pluginLoader.version, // static
    };
    // Check Network
    /*
     checkNetwork(function(callback) {
     if (!callback) {
     say("Cannot be used with no network connectivity");
     }
     });
     */
    require('dns').resolve('www.google.com', function(err) {
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
        } else {
            say("cyan", "No recent updates :)" + "\r\n" + "{" + "\r\n" + "\x1b[32mServer Name\x1b[0m: " + config.serverName + "\r\n" + "\x1b[32mServer Ip\x1b[0m: " + config.customip + "\r\n" + "{" + "\r\n");
            gameServer.senabled = true;
            setInterval(function() {
                create(gameServer, config);
            }, 1000 * 60); // update every minute
            create(gameServer, config); // Update on start..
            /*
             * 
             *  Extra startup needs
             * 
             */
            //getPing(gameServer);
        }
    });
};
this.beforespawn = function(player) {
    if (this.gameServer.senabled);
    if (typeof player.socket.remoteAddress !== 'undefined') {
        if (player.name == "") {
            sendOut.recentPlayer = "An unnamed cell";
            return true; // Spawn player without name
        } else {
            sendOut.recentPlayer = player.name;
            return true; // Spawn player in with name
        }
    } else {
        // Bot..
        return true; // Spawn bot in
    }
    return true;
};
var checkNetwork = function(callback) {
    // 
};
var getTopPlayer = function(gameServer) {};
var getPing = function(gameServer) {
    /*
     * 
     * Ping Development
     * 
     */
    gameServer.socketServer.on("connection", function(gameServer) {
        console.log("websocket connection open");
        var pingssent = 0;
        var interval = setInterval(function() {
            if (pingssent >= 2) {
                gameServer.socketServer.close();
            } else {
                gameServer.socketServer.ping();
                pingssent++;
            }
        }, 75 * 1000);
        gameServer.socketServer.on("pong", function() {
            pingssent = 0;
        });
    });
};
// delete server stats
var deletes = function(gameServer) {
    say("cyan", "opted out");
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
            //console.log(JSON.stringify({data: sendOut}));
            console.log(b);
        } else {
            console.log(e);
        }
    });
    return;
};
// create // refresh // update servers stats
var create = function(gameServer, config) {
    if (gameServer.senabled) {
        // ops forgot to add this
        gameServer.schecks = gameServer.schecks + 1;
        sendOut.gamemode = gameServer.config.serverGamemode;
        sendOut.serverName = config.serverName;
        getIP(gameServer, config.usevpsip, function(callback) {
            if (!callback) {
                say("red", "Could not update server ip");
            } else {
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
            var bufout = new Buffer(JSON.stringify({
                data: sendOut
            }), 'ascii');
            //console.log(bufout.toString('hex'));
            // Lets try hex instead of jSON
            request.post('http://stats.ogarul.tk/grab.php', {
                form: {
                    buffer: bufout
                }
            }, function(e, r, b) {
                if (!e) {
                    gameServer.schecks++;
                    if (b) {
                        if (config.alerts === 1) say("cyan", b);
                    }
                } else {
                    say("red", "Could not send data to server");
                }
            });
            /*
            request.post('http://stats.ogarul.tk/grab.php', {
                form: {
                    hash: JSON.stringify({
                        data: sendOut
                    })
                }
            }, function (e, r, b) {
                if (e) {
                    console.log("Could not send data");
                } else {
                    gameServer.schecks++;
                    if (b) {
                        if (config.alerts === 1) {
                            say("cyan", b);
                        }
                    }
                }
            });
            */
        }, 5000);
        return;
    } else {
        return;
    }
};
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
                } else {
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
    }
    return;
};
this.command[1] = function(gameServer, split) {
    if (split[1]) {
        var first = split[1].toLowerCase();
    } else {
        say("cyan", "Usage: stats [create, delete, optout, enable, disable, refresh]");
        return;
    }
    if (gameServer.senabled == false && typeof(gameServer.senabled) != 'undefied') {
        switch (first) {
            case "enable":
            case "disable":
                break;
            default:
                say("red", "Statistics has been deactivated since deleted. Please enable to use again: Usage: stats [enable, disable]");
                return;
        }
    }
    switch (first) {
        case "enable":
            if (!gameServer.senabled) {
                gameServer.senabled = true;
                say("green", "Enabled.");
                return true;
            }
            say("cyan", "Already enabled.");
            return true;
        case "disable":
            if (gameServer.senabled) {
                gameServer.senabled = false;
                say("red", "Disabled.");
                return true;
            }
            say("cyan", "Already disabled.");
            return true;
        case "refresh":
        case "create":
            if (gameServer.schecks > 0 && typeof(gameServer.schecks) != 'undefined') {
                say("say", "You just refreshed this server.");
            } else {
                say("cyan", "Added server to statistics list.");
            }
            create(gameServer, gameServer.config);
            return true;
        case "optout":
            say("red", "To opt out change the config in ./settings/Statistics/config.ini > 'optout' = '1'");
            return true;
        case "delete":
            say("red", "You have deleted your server statistics.");
            deletes(gameServer, gameServer.config);
            gameServer.senabled = false;
            return true;
        case "abort":
            say("red", "DELETING ALL STATISTICS AND STATISTICS DATA.");
            deletes(gameServer, gameServer.config);
            say("red", "WAITING FOR CALLBACK TO FINISH.");
            setTimeout(function() {
                say("red", "DELETING PLUGIN.");
                var d = [];
                d[1] = "delete";
                d[2] = "Statistics";
                say("red", "GOOD-BYE :(");
                gameServer.consoleService.execCommand("plugin", d);
                return;
            }, 5000);
            return;
    }
    return false;
};
module.exports = this; // dont touch
