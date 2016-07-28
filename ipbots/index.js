'use strict'; // DO NOT REMOVE
//
// .__      ___.           __          
// |__|_____\_ |__   _____/  |_  ______
// |  \____ \| __ \ /  _ \   __\/  ___/
// |  |  |_> > \_\ (  <_> )  |  \___ \ 
// |__|   __/|___  /\____/|__| /____  >
// |__|__|       \/                 \/ 
// - version 1.0.0 <Created By LegitSoulja>
//
// Notes.. Future references
// Add timer (limit) for how long a player will have bots for.. [ipbot add [ip or id] [minion amount] [time in minutes]
//
//___________________________________________________________________________________________________________________________________________
this.command = []; // dont touch
this.commandName = []; // dont touch
this.gamemodeId = []; // dont touch
this.gamemode = []; // dont touch
this.addToHelp = []; // dont touch
this.addToHelp[0] = "IPBots - Created by LegitSoulja";
this.addToHelp[1] = "ipbot rem [ip or id or all]";
this.addToHelp[2] = "ipbot add [ip or id] [minion amount]";
this.addToHelp[3] = "ipbot cache | Lists bot list";
this.addToHelp[4] = "ipbot getip [id] | Get player IP address";
this.addToHelp[5] = "ipbot getid [ip] | Get player IP from ID";
// [General]
this.name = "ipbots"; // Name of plugin REQUIRED
this.author = "LegitSoulja"; // author REQUIRED
this.description = 'ip bots, bots handler'; // Desciprtion
this.compatVersion = ''; // compatable with (optional)
this.version = '1.0.1'; // version REQUIRED
var ibot; // DO NOT REMOVE
this.commandName[1] = "ipbot";
this.command[1] = function(gameServer, split) {
    if (gameServer.ibot) {
        ibot.command(gameServer, split);
        return;
    } else {
        say.red("Was not loaded, and cannot be used..");
        return;
    }
};
this.config = {
    botname: "",
    superminions: 0,
    supermass: 10,
    superspeed: 35
};
this.configfile = "config.ini";
this.init = function(gameServer, config) {
    this.gameServer = gameServer;
    this.config = config;
    for (var o in gameServer.pluginLoader.plugins) {
        if (gameServer.pluginLoader.plugins[o].name == "GiveMeMinionsToo") {
            say.red("Plugin (GiveMeMinions) WAS FOUND!. THIS INTERFERES WITH (IPBOTS), AND SHOULD BE REMOVED!.");
            setTimeout(function() {
                say.red("Plugin (GiveMeMinions) WAS FOUND!. THIS INTERFERES WITH (IPBOTS), AND SHOULD BE REMOVED!.");
                say.green("Reason?? Is because GiveMeMinions resets bots every sowhat minutes from EVERY player.");
                say.green("IPBOTS does not listen to when a player does, or doesn't have bots. This is bad for a person to have bots then taken away and never given back.");
            }, 5000);
            // continue
        }
        // continue
    }
    if (gameServer.isMaster) {
        if (typeof(gameServer.ibot) == "undefined") {
            gameServer.ibot = true;
            ibot = new ipbots(gameServer, config, this.version);
        } else {
            say.red("Stopped another instance launch. ipbots cannot be loaded twice.");
            return;
        }
    } else {
        say.red("ipbots cannot be used for multiverse purposes. Maybe in the future this will exist.");
        return;
    }
};
this.beforespawn = function(player) {
    // todo
    if (ibot.gameServer.ibot && ibot.gameServer.isMaster) {
        if (typeof(player.ipbots) == 'undefined') {
            // instead of getting data from log.json, just get it from botcache..
            for (var i in ibot.botcache) {
                var o = ibot.botcache[i].split("||");
                if (player.socket.remoteAddress == o[0]) {
                    console.log("Giving player (" + player.pID + "), (" + o[1] + ") bots");
                    ibot.setBot(player, o[1]);
                    return true;
                }
            }
            return true;
        } else {
            return true;
        }
    } else {
        return true;
    }
};
var ipbots = function(gameServer, config, version) {
    this.pulse = process.uptime(); // future use
    this.version = version;
    this.botcache = [];
    this.gameServer = gameServer;
    this.config = config;
    this.superminions = config.superminions == 1 ? true : false;
    if (this.superminions) {
        say.cyan("SuperMinions was enabled for ipbots");
    }
    this.loadPresent();


    // checks for update..
    this.checkUpdate(version);

    if (typeof(gameServer.ibot) != "undefined" && gameServer.ibot == true) {
        this.cachetimer = setInterval(function() {
            // update log.json every 30 seconds.
            ibot.cache();
        }, 1000 * 30);
        return;
    } else {
        say.red("COULD NOT BE STARTED!.");
    }
};
ipbots.prototype.checkUpdate = function(version) {
    require("request")("https://raw.githubusercontent.com/AJS-development/OgarUL-Plugin-Library/master/ipbots/package.json", function(e, r, b) {
        if (!e && b && r) {
            if (r.statusCode == 200) { // ok
                var j = JSON.parse(b);
                if (j.version != version) {
                    say.cyan("Found IPBots update " + version + " >> " + j.version);
                    ibot.gameServer.ibot = false;
                    var up = [null, "update", "ipbots"];
                    ibot.gameServer.consoleService.execCommand("plugin", up);
                    // disable ibots
                    ibot.gameServer.ibot = false;
                    clearInterval(ibot.cachetimer);
                } else {
                    say.green("No updates was found.");
                }
            } else {
                say.red("Could not update :/");
            }
        } else {
            console.log("Failed to get ipbot latest version.");
        }
    });
};
ipbots.prototype.setBot = function(player, amount) {
    setTimeout(function() {
        if (typeof(player.ipbots) == "undefined") {
            player.ipbots = true; // used to determine if player already have bots or not..
            if (!ibot.superminions) {
                var gp = ["minion", player.pID, amount, ibot.config.botname];
                ibot.gameServer.consoleService.execCommand("minion", gp);
                return;
            } else {
                var sm = ["superminion", player.pID, amount, ibot.config.botname, ibot.config.supermass, ibot.config.superspeed];
                ibot.gameServer.consoleService.execCommand("superminion", sm);
                return;
            }
            return;
        }
        // player already has bots.. Fixed if ipbot add was executed twice after being removed..
        return;
    }, 2000);
};
ipbots.prototype.loadPresent = function() {
    try {
        require("fs").lstatSync(__dirname + "/log.json");
        var log = require(__dirname + "/log.json");
        say.green("Loading present bot file");
        var c = 0;
        for (var o in log) {
            var i = log[o].split('||');
            this.botcache.push(i[0] + "||" + i[1]);
            c++;
        }
        say.cyan("Loaded (" + c + ") ip" + (c > 1 ? "'s" : "") + " from previous bot list.");
    } catch (e) {
        say.green("Creating new bot log file..");
        require("fs").writeFile(__dirname + "/log.json", JSON.stringify(this.botcache));
    }
};
ipbots.prototype.command = function(gameServer, split) {
    var first = split[1];
    if (split.length > 1) {
        switch (first) {
            case "help":
                console.log("ipbot rem [ip or id or all]");
                console.log("ipbot add [ip or id] [minion amount]");
                console.log("ipbot cache | Lists bot list");
                console.log("ipbot getip [id] | Get player IP address");
                console.log("ipbot getid [ip] | Get player IP from ID");
                return;
            case "cache":
                say.green("Loading IPBOT List");
                console.log("|-------------------------------------");
                console.log("| IP            | Minion Amount | Time");
                for (var i in ibot.botcache) {
                    var o = ibot.botcache[i].split("||");
                    console.log("| " + o[0] + "     | " + o[1] + "             | NaN");
                }
                console.log("|-------------------------------------");
                return;
            case "rem":
                if (split[2]) {
                    if (split[2] == "all") {
                        ibot.botcache = [];
                        ibot.cache();
                        say.green("Removed all IP's from list!");
                        return;
                    }
                    if (!isNaN(split[2])) {
                        var ip = ibot.getIP(split[2]);
                        if (ip != 0) {
                            for (var i = 0; i < ibot.botcache.length; i++) {
                                if (ibot.botcache[i].indexOf(ip) > -1) {
                                    ibot.botcache.splice(i, 1);
                                    say.green("Removed (" + ip + ") from bot list");
                                    return;
                                }
                            }
                        } else {
                            say.red("Could not get player IP address from the ID you provided. Enter IP address manually.");
                            return;
                        }
                        say.red("Could not remove this player IP. Are you sure this player even had bots?");
                        return;
                    } else {
                        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(split[2])) {
                            for (var i = 0; i < ibot.botcache.length; i++) {
                                if (ibot.botcache[i].indexOf(split[2]) > -1) {
                                    ibot.botcache.splice(i, 1);
                                    say.green("Removed (" + split[2] + ") from bot list");
                                    return;
                                }
                            }
                            say.red("Could not find IP to be removed. Did you type the IP correctly?");
                            return;
                        } else {
                            say.red("No ID or IP was provided to be removed.");
                            return;
                        }
                    }
                }
                break;
            case "add":
                // ip or id, bot amount, time in minutes
                if (split[2] && split[3]) {
                    if (!isNaN(split[2])) {
                        var ip = ibot.getIP(parseInt(split[2]));
                        if (!isNaN(split[3])) {
                            if (ip != 0) {
                                for (var i in ibot.botcache) {
                                    if (ibot.botcache[i].indexOf(ip) > -1) {
                                        say.red("IP is already added. Remove, then add again to change bot values");
                                        return;
                                    }
                                }
                                ibot.botcache.push(ip + "||" + parseInt(split[3]));
                                say.green("Player (" + split[2] + ")(" + ip + "), has recieved (" + split[3] + ") bots, and will get bots each time he/she joins");
                                ibot.cache(); // quick save 
                                for (var i in gameServer.clients) {
                                    var client = gameServer.clients[i].playerTracker;
                                    if (client.pID == parseInt(split[2])) {
                                        ibot.setBot(client, split[3]); // give player bots when ip is added.
                                        return;
                                    }
                                }
                                say.red("Could not give player bots, maybe when he/she rejoins.");
                                return;
                            } else {
                                say.red("Could not get player (" + split[2] + ") ip address.");
                                return;
                            }
                            return;
                        } else {
                            say.red("Please provide a bot amount for this player ID");
                            return;
                        }
                    } else {
                        if (isNaN(split[2])) {
                            if (!isNaN(split[3])) {
                                if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(split[2])) {
                                    for (var i in ibot.botcache) {
                                        if (ibot.botcache[i].indexOf(split[2]) > -1) {
                                            say.red("IP is already added. Remove, then add again to change bot values");
                                            return;
                                        }
                                    }
                                    ibot.botcache.push(split[2] + "||" + split[3]);
                                    say.green("Player IP (" + split[2] + "), has recieved (" + split[3] + ") bots, and will get bots each time he/she joins.");
                                    ibot.cache(); // quick save 
                                    for (var i in gameServer.clients) {
                                        var id = ibot.getID(split[2]);
                                        if (id != 0) {
                                            var client = gameServer.clients[i].playerTracker;
                                            if (client.pID == id) {
                                                ibot.setBot(client, split[3]); // give player bots when ip is added.
                                                return;
                                            }
                                        }
                                    }
                                    say.red("Could not give player bots, maybe when he/she rejoins.");
                                    return;
                                } else {
                                    say.red("No valid ID or IP was provided..");
                                    return;
                                }
                            } else {
                                say.red("Please provide a bot amount for this player IP");
                                return;
                            }
                        } else {
                            say.red("No IP was provided.");
                            return;
                        }
                    }
                } else {
                    say.green("Usage: ipbot add [ip or id] [bot amount]");
                    return;
                }
                break;
            case "getid":
                if (split[2] && /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(split[2])) {
                    say.green(ibot.getID(split[2]));
                    return;
                } else {
                    say.green("No IP was provided");
                    return;
                }
                break;
            case "getip":
                if (!isNaN(split[2])) {
                    say.green(ibot.getIP(split[2]));
                    return;
                } else {
                    say.red("Please provide an ID to obtain ip");
                    return;
                }
                break;
            default:
                console.log("ipbot rem [ip or id or all]");
                console.log("ipbot add [ip or id] [minion amount]");
                console.log("ipbot cache | Lists bot list");
                console.log("ipbot getip [id] | Get player IP address");
                console.log("ipbot getid [ip] | Get player IP from ID");
                break;
        }
    } else {
        console.log("ipbot rem [ip or id or all]");
        console.log("ipbot add [ip or id] [minion amount]");
        console.log("ipbot cache | Lists bot list");
        console.log("ipbot getip [id] | Get player IP address");
        console.log("ipbot getid [ip] | Get player IP from ID");
        return;
    }
};
ipbots.prototype.getID = function(ip) {
    for (var o in ibot.gameServer.clients) {
        var p = ibot.gameServer.clients[o].playerTracker;
        if (p.socket.remoteAddress == ip) {
            return p.pID;
        }
    }
    return 0;
};
ipbots.prototype.getIP = function(id) {
    for (var o in ibot.gameServer.clients) {
        var p = ibot.gameServer.clients[o].playerTracker;
        if (p.pID == id) {
            if (typeof(p.socket.remoteAddress) != "undefined") {
                if (ibot.gameServer.clients.indexOf(parseInt(id)) > -1) {} else {
                    return p.socket.remoteAddress;
                }
            } else {
                // return 0 because you wouldn't want minions to get minions.
                return 0;
            }
        }
    }
    return 0;
};
ipbots.prototype.cache = function() {
    require("fs").writeFile(__dirname + "/log.json", JSON.stringify(this.botcache));
};
var say = {
    // Special say console logger, used in most plugins by LegitSoulja :_)
    head: this.name,
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
