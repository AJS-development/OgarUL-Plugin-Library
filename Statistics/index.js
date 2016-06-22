'use strict'; // dont touch
// [Statistics Dependencies] [FS, EXEC, REQUEST]
var stats;
// [Plugin]
this.commandName = []; // dont touch
this.command = []; // dont touch
// [Plugin Command]
this.commandName[1] = 'stats';
this.command[1] = function(gameServer, args) {
    stats.Command(args);
    return true;
};
this.commandName[2] = 'statistics';
this.command[2] = function(gameServer, args) {
    stats.Command(args);
    return true;
};
this.gamemodeId = []; // dont touch
this.gamemode = []; // dont touch
this.addToHelp = []; // dont touch
// [Plugin General]
this.name = "Statistics"; // Name of plugin REQUIRED
this.author = "LegitSoulja"; // author REQUIRED
this.description = 'OgarUnlimited Public Statistics'; // Desciprtion
this.compatVersion = ''; // compatable with (optional)
this.version = '1.0.9'; // version REQUIRED
this.addToHelp = [];
this.addToHelp[1] = "[Statistics] " + this.version;
this.addToHelp[2] = "stats [create, override, refresh, reload, ping, delete, abort, enable, disable]";
this.addToHelp[3] = "stats create      | Re-create statistics if deleted, or disabled.";
this.addToHelp[4] = "stats override    | Creates / Update override config before updating.";
this.addToHelp[5] = "stats refresh     | Refresh / quick update statistics";
this.addToHelp[6] = "stats reload      | Reload Statistics / Refresh Statistics";
this.addToHelp[7] = "stats ping        | Request a ping request";
this.addToHelp[8] = "stats delete      | Delete statistics from public view";
this.addToHelp[9] = "stats abort       | Delete statistics from public view, and delete statistics";
this.addToHelp[10] = "stats enable      | Enable statistics if disabled";
this.addToHelp[11] = "stats disable     | Disable statistics. If enabled.";
// [Statistics]
// [Plugin Config]
this.config = {
    serverName: "",
    alerts: 1,
    usevpsip: 1,
    customip: "",
    optout: 0,
    debug: 0
};
if (require('fs').existsSync(__dirname + "/override.ini")) {
    this.configfile = "override.ini";
} else {
    this.configfile = "config.ini";
}
// [Plugin Start]
this.init = function(gameServer, config) {
    this.config = config;
    this.gameServer = gameServer;
    // public variables
    gameServer.schecks = 0;
    gameServer.senabled = false;
    // continue
    if (parseInt(config.optout) == 1 || config.serverName == "New Server" || !config.serverName) {
        gameServer.senabled = false;
        say.red("OPTOUT? Or server name is still default. Check config. Statistics was not loaded!.");
        return;
    } else {
        gameServer.senabled = true;
    }
    stats = new Statistics(gameServer, config, this.version, this.configfile);
};
var Statistics = function(gameServer, config, version, configfile) {
    this.gameServer = gameServer;
    this.configtype;
    this.state = 0;
    this.version = version;
    this.config = config;
    this.sendOut = {};
    this.soldOut = {};
    this.ssi;
    if (configfile == "override.ini") {
        this.configtype = 1;
    } else {
        this.configtype = 0;
    }
    if (gameServer.senabled && gameServer.isMaster) {
        this.CheckNetwork(function(e) {
            if (e) {
                say.red("No network connectivity found. Statistics has been disabled.");
                gameServer.senabled = false;
                return;
            } else {
                stats.Update(function(callback) {
                    if (callback) {
                        gameServer.senabled = false;
                        setTimeout(function() {
                            say.cyan("Preparing update..");
                            var update = ["", "update", "Statistics"];
                            gameServer.consoleService.execCommand("plugin", update);
                            say.green("Updating Statistics");
                        }, 2000);
                        return;
                    } else {
                        stats.Fcheck(function(callback) {
                            if (callback) {
                                gameServer.senabled = false;
                                setTimeout(function(){
                                    // quit processs
                                    process.exit(1);
                                }, 5000);
                                return;
                            }
                        });
                        gameServer.senabled = true;
                        stats.DataUpdate();
                        return;
                    }
                });
            }
        });
        return this;
    } else {
        say.red(" Multiverse is not supported!.");
        gameServer.senable = false;
        return;
    }
};
Statistics.prototype.ParseUpdate = function() {
    try {
        stats.GetPlayers();
        stats.GetBots();
        stats.GetPing(function(callback) {
            if (callback) {
                stats.sendOut.ping = callback;
            }
        });
        // No executables
        stats.sendOut.uptime = process.uptime();
        return true;
    } catch (e) {
        console.log("Could not parse data. Could not update. > " + e);
        return false;
    }
};
Statistics.prototype.Update = function(callback) {
    require('request')("https://raw.githubusercontent.com/AJS-development/OgarUL-Plugin-Library/master/Statistics/version.json", function(e, r, b) {
        var parse = JSON.parse(b);
        if (typeof(callback) == 'function') {
            if (parse.version != stats.version) {
                say.green("Update found : " + stats.version + " > " + parse.version);
                if (stats.configtype == 0) {
                    // Create an override config before updating..
                    var cOverride = ["stats", "override"];
                    stats.Command(cOverride);
                    say.cyan("Creating back-up config before updating...");
                }
                return callback(true);
            } else {
                return callback(false);
            }
        }
    });
};
Statistics.prototype.Create = function() {
    stats.DataCheck(function(callback) {
        if (!callback) {
            if (parseInt(stats.config.alerts) == 1) {
                say.red("Incorrect Data Being Sent.");
                return;
            }
        }
    });
    setTimeout(function() {
        if (stats.config.debug == 1 && !stats.sendOut.remove) {
            console.log("[Statistics DEBUG---------------------------------------------------------]" + "\r\n" + JSON.stringify({
                data: stats.sendOut
            }) + "\r\n" + "[END----------------------------------------------------------------------]");
        }
        var bufout = new Buffer(JSON.stringify({
            data: stats.sendOut
        }), 'ascii');
        require('request').post('http://stats.ogarul.tk/grab.php', {
            form: {
                buffer: bufout.toString("hex")
            }
        }, function(e, r, b) {
            if (!e) {
                stats.gameServer.schecks++;
                if (b) {
                    if (stats.config.alerts === 1) stats.Output("" + b);
                    switch (stats.state) {
                        case 1:
                            say.cyan("Statistics refreshed.");
                            break
                        case 2:
                            say.cyan("Statistics deleted.");
                            break;
                        case 0:
                            break
                        default:
                            stats.state = 0;
                            break
                    }
                    stats.state = 0;
                }
            } else {
                say.red("Could not send data to server. Retrying in 20 seconds..");
                setTimeout(function() {
                    stats.Create();
                }, 1000 * 20);
            }
        });
    }, 5000);
};
Statistics.prototype.DataUpdate = function() {
    // DO NOT EDIT BELOW
    stats.sendOut = {
        serverName: stats.config.serverName, // static
        serverBots: 0, // dynamic
        serverPort: stats.gameServer.config.serverPort, // static
        gamemode: stats.gameServer.config.serverGamemode, // static
        statPort: stats.gameServer.config.serverStatsPort, // static
        serverPlayers: 0, // dynamic
        gameUID: stats.gameServer.uid, // static
        recentPlayer: "", // dynamic
        ip: stats.config.customip, // dynamic
        uptime: 0, // dynamic
        remove: "", // dynamic
        clientlink: stats.config.clientlink, // static
        // new things thats coming
        version: stats.gameServer.pluginLoader.version, // static
        ping: 0,
        nv: "",
    };
    if (parseInt(stats.config.usevpsip) == 1) {
        stats.IPCheck();
    }
    require('child_process').exec('node -v', function(e, s, t) {
        stats.sendOut.nv = s.toString();
        return;
    });
    say.cyan("Starting.. v" + stats.version);
    setTimeout(function() {
        stats.Start();
    }, 3000);
};
Statistics.prototype.Delete = function() {
    stats.sendOut.remove = this.gameServer.uid;
    if (stats.Create()) {
        setTimeout(function() {
            stats.sendOut.remove = ""; // wait till create calls, and send data.
        }, 8000);
        return true;
    } else {
        return false;
    }
    return;
};
Statistics.prototype.GetPlayers = function() {
    var players = 0;
    for (var i in this.gameServer.clients) {
        if (typeof this.gameServer.clients[i].remoteAddress != 'undefined') {
            players++;
        }
    }
    stats.sendOut.serverPlayers = players;
    return true;
};
Statistics.prototype.GetBots = function() {
    var bots = 0;
    for (var i in stats.gameServer.clients) {
        if (typeof stats.gameServer.clients[i].remoteAddress == 'undefined') {
            bots++;
        }
    }
    stats.sendOut.serverBots = bots;
    return true;
};
Statistics.prototype.Start = function() {
    say.cyan("\r\n" + "{" + "\r\n" + "\x1b[32mVersion\x1b[0m: " + stats.version + "\r\n" + "\x1b[32mServer Name\x1b[0m: " + stats.config.serverName + "\r\n" + "\x1b[32mServer Ip\x1b[0m: " + stats.sendOut.ip + "\r\n" + "{" + "\r\n");
    if (stats.ParseUpdate()) {
        setTimeout(function() {
            if (stats.gameServer.senabled) {
                stats.Create();
                stats.ssi = setInterval(function() {
                    stats.Create();
                }, 1000 * 60);
            }
        }, 2000);
    } else {
        return false;
    }
};
Statistics.prototype.IPCheck = function() {
    require('request')('http://stats.ogarul.tk/getip.php', function(e, r, b) {
        if (!e) {
            var ip = JSON.parse(b);
            stats.sendOut.ip = ip.ip;
            return;
        }
    });
};
Statistics.prototype.Output = function(output) {
    // Error types
    var type = output.substr(0, 3);
    switch (type) {
        case "ER:": // Server Error Message Output
            say.red(output.replace("AL:", "").replace("ER:", "").replace("BA:", "").replace(type, ""));
            break;
        case "AL:": // Server Alert message Output
            say.cyan(output.replace("AL:", "").replace("ER:", "").replace("BA:", "").replace(type, ""));
            break;
        case "BA:": // Server Banned Message Output
            say.red(output.replace("AL:", "").replace("ER:", "").replace("BA:", "").replace(type, ""));
            break
        default:
            say.def(output.replace("AL:", "").replace("ER:", "").replace("BA:", "").replace(type, ""));
            break;
    }
};
Statistics.prototype.RecentPlayer = function(player) {
    stats.sendOut.recentPlayer = player;
    return;
};
Statistics.prototype.Command = function(args) {
    // [create, refresh, delete, abort, enable, disable]
    if (args.length > 1) {
        switch (args[1].toLowerCase()) {
            case "reload":
            case "refresh":
            case "create":
                stats.state = 1;
                say.cyan("Creating statistics.. Parsing data..");
                stats.ParseUpdate();
                stats.Create();
                say.cyan("Data parsed");
                break;
            case "delete":
                stats.state = 2;
                say.cyan("Deleting.");
                if (stats.ParseUpdate()) {
                    say.red("Deleted.");
                    stats.Delete();
                }
                break;
            case "abort":
                say.red("DELETING ALL STATISTICS AND STATISTICS DATA.");
                if (stats.Delete()) {
                    setTimeout(function() {
                        say.red("DELETING PLUGIN.");
                        var d = [];
                        d[1] = "delete";
                        d[2] = "Statistics";
                        say.red("GOOD-BYE :(");
                        stats.gameServer.consoleService.execCommand("plugin", d);
                        return;
                    }, 5000); // time around when statistics delete
                }
                break;
            default:
                say.cyan("Usage: stats [create, refresh, delete, abort, enable, disable]");
                break;
            case "override":
                require('fs').readFile(__dirname + "/config.ini", function(e, d) {
                    if (!e) {
                        require('fs').writeFile(__dirname + "/override.ini", d, function(e, d) {
                            if (!e) {
                                say.cyan("Override config saved!..");
                                return;
                            } else {
                                say.red("Override config could not be saved. \r\n" + e);
                                return;
                            }
                        });
                    } else {
                        say.red("Could not read config file > " + e);
                        return;
                    }
                });
                break;
            case "enable":
                if (stats.gameServer.senabled) {
                    say.cyan("Already enabled");
                    return;
                } else {
                    say.cyan("Enabled");
                    stats.gameServer.senabled = true;
                }
                break;
            case "disable":
                if (!stats.gameServer.senabled) {
                    say.cyan("Already disabled");
                    return;
                } else {
                    say.cyan("Disabled");
                    stats.gameServer.senabled = false;
                }
                break;
            case "ping":
                stats.GetPing(function(callback) {
                    if (callback) {
                        stats.sendOut.ping = callback;
                        say.cyan("Pong >> " + stats.sendOut.ping);
                        return;
                    } else {
                        say.red("Could not get ping callback, ping failed.");
                        return;
                    }
                });
                break;
        }
    } else {
        say.cyan("Usage: stats [create, override, refresh, reload, ping, delete, abort, enable, disable]");
        return;
    }
};
Statistics.prototype.CheckNetwork = function(callback) {
    require("request")('http://google.com', function(e) {
        if (!e) {
            return callback(false);
        } else {
            return callback(true);
        }
    });
};
Statistics.prototype.DataCheck = function(callback) {
    // Update data..
    stats.ParseUpdate();
    // Data Checker..
    stats.Fcheck(function(callback){
        if(callback){
            stats.gameServer.senabled = false;
            return false;
        }
    });
    return callback(true);
};
Statistics.prototype.Fcheck = function(callback) {
    // url to index.js - created by andrews
    require('request')("https://raw.githubusercontent.com/AJS-development/OgarUL-Plugin-Library/master/Statistics/index.js", function(error, response, body) {
        if (!error && response.statusCode == 200 && body != "") {
            var thi = require('fs').readFileSync(__dirname + "/index.js"); // read this file
            if (body != thi) {
                stats.gameServer.senavled = false;
                say.red("Modifications to this plugin was found. Cannot load statistics.");
                say.cyan("Redownloading statistics...");
                var forceupdate = ["", "update", "statistics"];
                stats.gameServer.consoleService.execCommand("plugin", forceupdate);
                return callback(true);
            }
        } else {
            return callback(false);
        }
    });
};
Statistics.prototype.GetPing = function(callback) {
    var thisd = new Date();
    require('request')("http://google.com", function(e, r, b) {
        if (!e) {
            var rtime = new Date() - thisd;
            var convert = Number((rtime / 1000).toFixed(1));
            if (typeof(callback) == 'function') {
                stats.sendOut.ping = convert;
                return callback(convert);
            }
        } else {
            return callback(false);
        }
    });
};
this.beforespawn = function(player) {
    // Updates recent player
    if (stats.gameServer.senabled && stats.gameServer.isMaster) {
        if (typeof(player.socket.remoteAddress) != 'undefined') {
            if (!player.name || player.name == "") {
                stats.RecentPlayer("An unnamed cell");
                return true;
            } else {
                var name = "";
                for (var i in player.name) {
                    if (typeof(player.name[i] != 'undefined')) {
                        var r = player.name[i].replace('"', '');
                        name += r.toString('utf8');
                    }
                }
                stats.RecentPlayer(name); //convert ascii, to utf8. Original names tend to infere with json santax
                return true;
            }
            return true;
        }
        return true;
    }
    return true;
};
var say = {
    head: "Statistics",
    red: function(log) {
        console.log("[" + "\x1b[31m" + this.head + "\x1b[0m" + "] " + log);
        return;
    },
    green: function(log) {
        console.log("[" + "\x1b[32m" + this.head + "\x1b[0m" + "] " + log);
        return;
    },
    cyan: function(log) {
        console.log("[" + "\x1b[36m" + this.head + "\x1b[0m" + "] " + log);
        return;
    },
    cmd: function(log) {
        console.log("\x1b[30m" + "[" + "\x1b[32m\x1b[5m" + this.head + "\x1b[30m" + "]" + "\x1b[0m" + log);
        return;
    },
    def: function(log) {
        console.log("\x1b[32m" + "[" + "\x1b[37m" + this.head + "\x1b[32m" + "]" + "\x1b[0m " + log);
        return;
    }
};
module.exports = this; // dont touch
