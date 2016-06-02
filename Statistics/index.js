'use strict'; // dont touch
const request = require('request');
const net = require('net');
const exec = require("child_process").exec;
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
this.version = '1.0.7'; // version REQUIRED
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
// Start
this.init = function(gameServer, config) {
  this.gameServer = gameServer;
  this.config = config;
  // gameServer public variable
  gameServer.schecks = 0;
  // Check if server new
  if(config.serverName == "New Server"){
      say.cyan("Please update configuration file in ./plugins/Statistics/config.ini");
      say.green("Please update configuration file in ./plugins/Statistics/config.ini");
      say.red("Please update configuration file in ./plugins/Statistics/config.ini");
      say.def("Please update configuration file in ./plugins/Statistics/config.ini");
      gameServer.senabled = false;
      return;
  }
  // Check network
  checkNetwork(function(err) {
    if (err) {
      say.red("No network connectivity for Statistics");
      gameServer.senabled = false;
      return;
    }
  });
  // Check OptOut
  if (this.config.optout === 1) {
    deletes(gameServer);
    return;
  }
  // Update Packages
  update(gameServer, config);
  // Check for updates
  checkUpdate(this.version, function(update) {
    if (update) {
      say.cyan("Preparing update..");
      var uc = [];
      uc[1] = "update";
      uc[2] = "Statistics";
      gameServer.consoleService.execCommand("plugin", uc);
      setTimeout(function() {
        say.green("Restarting...");
        process.exit(3);
        return;
      }, 3000);
      return;
    }
  });
  var ip;
  // Check for custom ip changes
  if (config.usevpsip === 1) {
    getIP(gameServer, config, function(callback) {
      if (callback) {
        say.cyan("No recent updates :)" + "\r\n" + "{" + "\r\n" + "\x1b[32mServer Name\x1b[0m: " + config.serverName + "\r\n" + "\x1b[32mServer Ip\x1b[0m: " + callback + "\r\n" + "{" + "\r\n");
      } else {
        console.log("Could not get ip");
        say.red("Terminated due to failed to obtaining ip address. You can use custom or restart the game to try again.");
        return;
      }
    });
  } else {
    setTimeout(function() {
      say.cyan("No recent updates :)" + "\r\n" + "{" + "\r\n" + "\x1b[32mServer Name\x1b[0m: " + config.serverName + "\r\n" + "\x1b[32mServer Ip\x1b[0m: " + config.customip + "\r\n" + "{" + "\r\n");
    }, 2000);
  }
  // Enable Statistics
  gameServer.senabled = true;
  // Start Update Interval
  setInterval(function() {
    create(gameServer, config);
  }, 1000 * 60); // update every minute
  // Update quick before timeout
  create(gameServer, config); // Update on start..
};
// Player spawn event
this.beforespawn = function(player) {
  if (this.gameServer.senabled) {
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
  } else {
    return true;
  }
};
// Check network
var checkNetwork = function(callback) {
  require('dns').resolve('www.google.com', function(err) {
    if (err) {
      return callback(true);
    } else {
      return callback(false);
    }
  });
};
// Get Top Player
var getTopPlayer = function(gameServer) {};
// Stock (Few things that's need to be updated on start)
var update = function(gameServer, config) {
  sendOut = {
    serverName: config.serverName, // static
    serverBots: 0, // dynamic
    serverPort: gameServer.config.serverPort, // static
    gamemode: gameServer.config.serverGamemode, // static
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
    ping: 0,
    nv: "",
  };
  exec('node -v', function(e, s, t) {
    sendOut.nv = s.toString();
    console.log("[Node] > " + s.toString());
  });
};
// Get Ping
var getPing = function(callback) {
  var thisd = new Date();
  request("http://google.com", function(e, r, b) {
    if (!e) {
      var rtime = new Date() - thisd;
      var convert = Number((rtime / 1000).toFixed(1));
      return callback(convert);
    } else {
      return callback(false);
    }
  });
};
// Delete server stats
var deletes = function(gameServer) {
  sendOut.remove = gameServer.uid;
  request.post('http://stats.ogarul.tk/grab.php', {
    form: {hash: JSON.stringify({data: sendOut})}
  }, function(e, r, b) {
    if (!e) {
      //console.log(JSON.stringify({data: sendOut}));
      say.cyan("opted out");
      sendOut.remove = "";
      console.log(b);
    } else {
      console.log(e);
    }
  });
  return;
};
// Create // Refresh // Update servers stats
var create = function(gameServer, config) {
  if (gameServer.senabled) {
    gameServer.schecks = gameServer.schecks + 1;
    getPing(function(callback) {
      if (callback) {
        sendOut.ping = callback;
      } else {
        say.red("Failed to get ping");
      }
    });
    getIP(gameServer, config, function(callback) {
      if (callback) {
        sendOut.ip = callback;
      } else {
        say.red("Could not update server ip");
      }
    });
    getPlayers(gameServer, function(callback) {
      sendOut.serverPlayers = callback;
    });
    getBots(gameServer, function(callback) {
      sendOut.serverBots = callback;
    });
    setTimeout(function() {
      if (config.debug == 1) {console.log("[Statistics DEBUG---------------------------------------------------------]" + "\r\n" + JSON.stringify({data: sendOut}) + "\r\n" + "[END----------------------------------------------------------------------]");}
      var bufout = new Buffer(JSON.stringify({data: sendOut}), 'ascii');
      // Lets try hex instead of jSON
      request.post('http://stats.ogarul.tk/grab.php', {
        form: {buffer: bufout.toString("hex")}
      }, function(e, r, b) {
        if (!e) {
          gameServer.schecks++;
          if (b) {
            if (config.alerts === 1) say.cyan(b);
          }
        } else {
          say.red("Could not send data to server");
        }
      });
    }, 5000);
    return;
  } else {
    return;
  }
};
// Check for updates
var checkUpdate = function(version, callback) {
  request("http://raw.githubusercontent.com/AJS-development/OgarUL-Plugin-Library/master/Statistics/version.json", function(e, r, b) {
    var parse = JSON.parse(b);
    if (callback && typeof(callback) == 'function') {
      if (parse.version !== version) {
        say.green("Found new update " + version + " > " + parse.version);
        return callback(true);
      }
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
var getIP = function(gameServer, config, callback) {
  if (callback && typeof(callback) == "function") {
    if (config.usevpsip == 1) {
      request("http://stats.ogarul.tk/getip.php", function(e, r, b) {
        if (!e) {
          var p = JSON.parse(b);
          sendOut.ip = p.ip;
          return callback(p.ip);
        } else {
          say.red("Could not get vps ip");
          return;
        }
      });
    }
    return;
  }
};
// Port Scanner
var portScanner = function(port, callback) {};
// Say(Console Colour)
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
// Update 
this.onsecond = function(gameServer) {};
// Command Handler
this.command[1] = function(gameServer, split) {
  if (split[1]) {
    var first = split[1].toLowerCase();
  } else {
    say.cyan("Usage: stats [create, delete, optout, enable, disable, refresh]");
    return;
  }
  if (gameServer.senabled == false && typeof(gameServer.senabled) != 'undefied') {
    switch (first) {
      case "enable":
      case "disable":
        break;
      default:
        say.red("Statistics has been deactivated since deleted. Please enable to use again: Usage: stats [enable, disable]");
        return;
    }
  }
  switch (first) {
    case "say":
      // stats say color red log
      var color = split[3];
      var log = split[4];
      if (split[2] == "color") {
        if (split[3] && split[4]) {
          switch (color) {
            case "red":
              say.red(log);
              return true;
            case "green":
              say.green(log);
              return true;
            case "cyan":
              say.cyan(log);
              return true;
            case "default":
              say.def(log);
              return true;
            default:
              say.def(log);
              return true;
          }
        }
      } else {
        if (split[2]) {
          say.def(split[2]);
          return true;
        } else {
          say.cyan("Usage: stats say color [red, green, cyan, default, or null] [message]");
          return false;
        }
      }
    case "enable":
      if (!gameServer.senabled) {
        gameServer.senabled = true;
        say.green("Enabled.");
        return true;
      }
      say.cyan("Already enabled.");
      return true;
    case "disable":
      if (gameServer.senabled) {
        gameServer.senabled = false;
        say.red("Disabled.");
        return true;
      }
      say.cyan("Already disabled.");
      return true;
    case "refresh":
    case "create":
      if (gameServer.schecks > 0 && typeof(gameServer.schecks) != 'undefined') {
        say.cyan("You just refreshed this server.");
      } else {
        say.cyan("Added server to statistics list.");
      }
      create(gameServer, gameServer.config);
      return true;
    case "optout":
      say.red("To opt out change the config in ./settings/Statistics/config.ini > 'optout' = '1'");
      return true;
    case "delete":
      say.red("You have deleted your server statistics.");
      deletes(gameServer, gameServer.config);
      gameServer.senabled = false;
      return true;
    case "abort":
      say.red("DELETING ALL STATISTICS AND STATISTICS DATA.");
      deletes(gameServer, gameServer.config);
      say.red("WAITING FOR CALLBACK TO FINISH.");
      setTimeout(function() {
        say.red("DELETING PLUGIN.");
        var d = [];
        d[1] = "delete";
        d[2] = "Statistics";
        say.red("GOOD-BYE :(");
        gameServer.consoleService.execCommand("plugin", d);
        return;
      }, 5000);
      return;
  }
  return false;
};
module.exports = this; // dont touch
