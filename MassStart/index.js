"use strict";
//  __  __   __   ___  ___  ___  ____  __   ___  ____ 
// (  \/  ) (  ) / __)/ __)/ __)(_  _)(  ) (  ,)(_  _)
//  )    (  /__\ \__ \\__ \\__ \  )(  /__\  )  \  )(  
// (_/\/\_)(_)(_)(___/(___/(___/ (__)(_)(_)(_)\_)(__) 
//  vєrsíσn: 1.0.1(patch 0.2) Offícíαl Rєlєαsє
//  Authσr : LєgítSσuljα
//  cσntαct : support@legitsoulja.info
//
try {
  this.command = [], 
      this.commandName = [], 
      this.gamemodeId = [], 
      this.gamemode = [], 
      this.addToHelp = [], 
      this.name = "MassStart", 
      this.author = "LegitSoulja",
      this.description = "MassStarter", 
      this.compatVersion = "", 
      this.version = "1.0.1p", 
      this.addToHelp[0] = "ms [add,set,rem] [id] [mass]", 
      this.addToHelp[1] = "msl [add,rem,list] [id,ip] [mass(add,rem)] (Mass Bot List)", 
      this.commandName[0] = "ms", 
      this.commandName[1] = "msl", 
      this.command[0] = function (s, e) {
      if (!(e.length > 1)) return void console.log("ms [add,set,rem] [id] [mass]");
      var a = e[1].toString()
        .toLowerCase();
      switch (a) {
      case "set":
        if (isNaN(e[2]) || isNaN(e[3])) return void console.log("Usage: ms [set] [id] [mass]");
        for (var o in s.clients) {
          var t = s.clients[o].playerTracker;
          if (t.pID == e[2]) return mass.set(t, parseInt(e[3]), null), void console.log("Setted " + e[3] + " to " + t.name + " mass")
        }
        break;
      case "add":
        if (isNaN(e[2]) || isNaN(e[3])) return void console.log("Usage: ms [add] [id] [mass]");
        for (var r in s.clients) {
          var t = s.clients[r].playerTracker;
          if (t.pID == e[2]) return mass.add(t, parseInt(e[3]), null), void console.log("Added " + e[3] + " to " + t.name + " mass")
        }
        break;
      case "rem":
        if (isNaN(e[2]) || isNaN(e[3])) return void console.log("Usage: ms [rem] [id] [mass]");
        for (var n in s.clients) {
          var t = s.clients[n].playerTracker;
          if (t.pID == e[2]) return mass.remove(t, parseInt(e[3]), null), void console.log("Removed " + e[3] + " from " + t.name + " mass")
        }
        break;
      default:
        return void console.log("ms [set, add, rem] [id] [mass]")
      }
    }, 
      this.command[1] = function (s, e) {
      if (!(e.length > 1 && 1 == mass.config.masslist)) return 1 != mass.config.masslist ? void console.log(
        "Enable this command feature in MassStart configuration.") : (console.log(mass.language[6]), void console.log("Usage: msl [rem] all"));
      switch (e[1].toString()
        .toLowerCase()) {
      case "add":
        mass.listAdd(e);
        break;
      case "rem":
        mass.listRemove(e);
        break;
      case "reload":
        return void mass.loadList();
      case "list":
        mass.list();
        break;
      default:
        return void console.log(mass.language[0] + mass.language[6])
      }
    }, 
      this.config = {
      playerStartMass: 10,
      notification: 0,
      ipperplay: 1,
      masslist: 0,
      debug: 0,
      output: 1
    }, 
      this.configfile = "config.ini", this.init = function (s, e) {
      return mass.version = this.version, mass.gameServer = s, mass.config = e, "undefined" == typeof s.msa && s.isMaster ? s.isMaster ? (s.msa = !0, void mass.start()) :
        void console.log(col.red + mass.language[0] + col.reset + mass.language[8]) : void console.log(col.red + mass.language[0] + col.reset + mass.language[7])
    };
    var col = {reset: "[0m",bright: "[1m",dim: "[2m",underscore: "[4m",blink: "[5m",reverse: "[7m",hidden: "[8m",black: "[30m",red: "[31m",green: "[32m",yellow: "[33m", blue: "[34m",magenta: "[35m", cyan: "[36m",white: "[37m",bgblack: "[40m",bgred: "[41m",bggreen: "[42m",bgyellow: "[43m",bgblue: "[44m",bgmagenta: "[45m", bgcyan: "[46m",bgwhite: "[47m"},
    mass = {
      restartTries: 5,
      startt: !1,
      data: null,
      version: "",
      start: function () {
        if (0 == parseInt(mass.config.output) && (mass.language = []), 1 == parseInt(mass.config.masslist)) try {
          return require("fs").lstatSync(__dirname + "/masslist.json"),
                      mass.loadList(), console.log(col.cyan + mass.language[0] + col.reset + mass.language[1]), 
                      void setInterval(function () {
                        mass.save()
                      }, 6e4)
        } catch (s) {
          if (!(s.toString().indexOf("ENOENT") >= 0)) return void console.log(s);
          if (parseInt(mass.restartTries) > 1) return mass.restartTries--, console.log("[MassStart] ERROR, **Retrying.. Retries(" + mass.restartTries + ")"),
            require("fs")
            .writeFile(__dirname + "/masslist.json", ""), void setTimeout(function () {
              mass.start()
            }, 5e3)
        }
      },
      language: ["[MassStart] ", "Stαrtíng :)", "Could not create massList.json.", "Failed to load IP List","IP is already found, and cannot be added to the list again.", "Please enter a valid number", "Usage: msl [add,rem] [(id,ip), all]","Cannot run more than self", "Multiverse is not supported", "Added to the list", "An error occurred", "Could not get player IP","Please provide mass amount.", "Cannot define IP of ID nor IP.", "Could not find that IP on the list.", "Could not get data from masslist.json","You cannot join twice. You will have to wait until your cell die.", "Reloading will make it worse. Try to stay in the game, and don't relog.","Could not save log.."],
      massList: [],
      gameServer: null,
      config: null,
      add: function (s, e, a) {
        1 == parseInt(mass.config.notification) && mass.gameServer.pm(s.pID, "Adding mass > " + e, "[MassStart]"), setTimeout(function () {
          for (var a in s.cells) s.cells[a].mass = s.cells[a].mass + e
        }, null != a ? a : 0)
      },
      set: function (s, e, a) {
        console.log("Add " + e + " to player " + s.name), 1 == parseInt(mass.config.notification) && mass.gameServer.pm(s.pID, "Setting mass > " + e,
          "[MassStart]"), setTimeout(function () {
          for (var a in s.cells) s.cells[a].mass = e
        }, null != a ? a : 0)
      },
      remove: function (s, e, a) {
        1 == parseInt(mass.config.notification) && mass.gameServer.pm(s.pID, "Removing mass > " + e, "[MassStart]"), setTimeout(function () {
          for (var a in s.cells) s.cells[a].mass = s.cells[a].mass - e
        }, null != a ? a : 0)
      },
      getIP: function (s) {
        for (var e in mass.gameServer.clients) {
          var a = mass.gameServer.clients[e].playerTracker;
          if (a.pID == s) {
            if ("undefined" == typeof a.socket.remoteAddress) return 0;
            if (!(mass.gameServer.clients.indexOf(parseInt(s)) > -1)) return a.socket.remoteAddress
          }
        }
        return 0
      },
      list: function () {
        console.log("[---------------------------------------------]"), 
        console.log("| " + col.green + "MassStart " + col.reset + spaceCheck(34) + "|"), 
        console.log("[---------------------------------------------]"), 
        console.log("| " + col.yellow + "ιρ" + col.reset + "                 | " + col.yellow + "Mαѕѕ Aмσυит" + col.reset + "            |"), 
        console.log("|--------------------|------------------------|");
        var s = 0;
        for (var e in mass.massList)
          if (mass.massList[e] && mass.massList[e].toString()
            .indexOf("||") >= 0) {
            var a = mass.massList[e].split("||");
            s++;
            var o = spaceCheck(19 - a[0].length),
              t = spaceCheck(23 - a[1].length);
            console.log("| " + a[0] + o + "| " + a[1] + t + "|")
          }
        return 1 > s ? (console.log("|     There's no saved log information        |"), void console.log("[---------------------------------------------]")) :
          void console.log("[---------------------------------------------]")
      },
      save: function () {
        require("fs").writeFile(__dirname + "/masslist.json", JSON.stringify(mass.massList))
      },
      listAdd: function (s) {
        mass.loadList();
        var e = mass.massList.toString("utf8").replace(/,/g, "<>").split("<>");
        if (!s[2] || isNaN(s[2]) || isNaN(3)) {
          if (
            /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
            .test(s[2])) {
            if (isNaN(s[3])) return void console.log(col.red + mass.language[0] + col.reset + mass.language[12]);
            for (var a in e)
              if (e[a].indexOf(s[2].toString()) >= 0) return void console.log(col.red + mass.language[0] + col.reset + mass.language[4]);
            return !isNaN(s[3]) &&
              /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
              .test(s[2].toString()) ? (mass.massList.push(s[2].toString() + "||" + s[3]), mass.save(), void console.log(col.green + mass.language[0] + col.reset +
                mass.language[9])) : void console.log(col.red + mass.language[0] + col.reset + mass.language[11])
          }
          return void console.log(col.red + mass.language[0] + col.reset + mass.language[13])
        }
        var o = mass.getIP(s[2]);
        if (0 != o &&
          /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
          .test(o)) {
          for (var a in e)
            if (e[a].indexOf(s[2]) >= 0) return void console.log(col.red + mass.language[0] + col.reset + mass.language[4]);
          return o && s[3] && !isNaN(s[3]) &&
            /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
            .test(o) ? (mass.massList.push(o.toString() + "||" + s[3]), mass.save(), void console.log(col.green + mass.language[0] + col.reset + mass.language[9])) :
            void console.log(col.red + mass.language[0] + col.reset + mass.language[10])
        }
        return void console.log(col.red + mass.language[0] + col.reset + mass.language[11])
      },
      listRemove: function (s) {
        if (s[2] && "all" == s[2]) return void mass.listClean();
        if (s[2] && !isNaN(s[2])) {
          var e = mass.getIP(s[2]);
          if (0 == e) return void console.log(col.red + mass.language[0] + col.reset + mass.language[11]);
          if (
            /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
            .test(e)) {
            var e = mass.massList.toString("utf8")
              .replace(/,/g, "<>")
              .split("<>");
            for (var a in e)
              if (e[a].toString()
                .indexOf(e) >= 0) return console.log(col.green + mass.language[0] + col.reset + mass.language[0] + "Removed.."), mass.massList.splice(a, 1), void mass
                .save();
            return void console.log(col.red + mass.language[0] + col.reset + mass.language[14])
          }
        } else {
          if (!s[2]) return;
          if (
            /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
            .test(s[2])) {
            var e = mass.massList.toString("utf8")
              .replace(/,/g, "<>")
              .split("<>");
            for (var a in e)
              if (e[a].toString()
                .indexOf(s[2]) >= 0) return console.log(col.green + mass.language[0] + col.reset + mass.language[0] + "Removed.."), mass.massList.splice(a, 1), void mass
                .save();
            return void console.log(col.red + mass.language[0] + col.reset + mass.language[14])
          }
        }
      },
      listClean: function () {
        mass.massList = [], mass.save()
      },
      loadList: function () {
        setTimeout(function () {
          require("fs")
            .readFile(__dirname + "/masslist.json", function (s, e) {
              if (!e) return void console.log(col.red + mass.language[0] + col.reset + mass.language[15]);
              try {
                var a = JSON.parse(e);
                mass.data = a;
                var o = 0;
                mass.massList = [];
                for (var t in a) mass.massList.push(a[t]), o++;
                return void(mass.startt && (console.log(col.green + mass.language[0] + col.reset + "Loaded {" + o + "} ip" + (o > 1 ? "'s" : "") + " mass list."),
                  mass.startt = !1))
              } catch (e) {
                throw console.log(col.yellow + mass.language[0] + col.reset + mass.language[18] + "Ignoring.."), mass.massList = [], e
              }
            })
        }, 2e3)
      }
    },
    spaceCheck = function (s) {
      for (var e = "", a = 0; s > a; a++) e += " ";
      return e
    };
  this.beforespawn = function (s) {
    if ("undefined" != typeof s.socket.remoteAddress) {
      try {
        if (1 == parseInt(mass.config.masslist)) {
          var e = 0;
          for (var a in mass.gameServer.clients) {
            var o = mass.gameServer.clients[a].playerTracker;
            if ("undefined" != typeof o.socket.remoteAddress && o.socket.remoteAddress === s.socket.remoteAddress) {
              var o = mass.gameServer.clients[a].playerTracker;
              e++
            }
          }
          if (!(e < parseInt(mass.config.ipperplay + 1))) return mass.gameServer.pm(s.pID, mass.language[16], mass.language[0]), mass.gameServer.pm(s.pID, mass.language[
            17], mass.language[0]), s.nospawn = !0, s.socket.close(), !1;
          var t = mass.massList.join(",")
            .toString()
            .replace(/,/g, "<>")
            .split("<>");
          for (var r in t) {
            var n = t[r].split("||");
            if (
              /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
              .test(n[0])) {
              if (t[r].toString("utf8")
                .indexOf(s.socket.remoteAddress) >= 0) {
                if (!isNaN(parseInt(n[1])) && parseInt(n[1]) > 0) return mass.add(s, parseInt(n[1] > 0 ? n[1] : mass.config.playerStartMass), 1e3), !0;
                1 == parseInt(mass.config.debug) && console.log(col.red + mass.language[0] + col.reset + "Data{" + t[r] +
                  "} is corrupted!. Unable to give assigned mass.")
              }
            } else 1 == parseInt(mass.config.debug) && console.log(col.red + mass.language[0] + col.reset + "Data{" + t[r] +
              "} is corrupted!. Unable to give assigned mass.")
          }
          return mass.set(s, mass.config.playerStartMass, 1e3), 1 == parseInt(mass.config.debug) && console.log(col.yellow + mass.language[0] + col.reset + NaN), !
            0
        }
        return mass.set(s, parseInt(mass.config.playerStartMass), 1e3), !0
      } catch (l) {
        return console.log(l), !0
      }
      return !0
    }
    return !0
  }, module.exports = this
} catch (e) {
  throw console.log(e), e
}
