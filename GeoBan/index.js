"use strict";
var geoip, exec = require("child_process").exec, countries = [];
this.command = [], 
this.commandName = [], 
this.gamemodeId = [], 
this.gamemode = [], 
this.addToHelp = [], 
this.name = "GeoBan", 
this.author = "LegitSoulja", 
this.description = "GeoBan", 
this.compatVersion = "", 
this.version = "1.0.0", 
this.config = {
    countries: ""
}, 
this.configfile = "config.ini";
this.init = function (e, i) {
    try {
        geoip = require("geoip-lite")
    } catch (t) {
        console.log("\x1b[32mInstalling geoip-lite module.. Restarting afterwards.\x1b[0m"), exec("npm install geoip-lite", {
            cmd: __dirname
        }, function () {
            console.log("\x1b[31mModules installed for Geo. Restarting server!..\x1b[0m"), setTimeout(process.exit(3), 2e3)
        })
    }
    this.gameServer = e, this.config = i;
    var o = i.countries.split(",");
    for (var s in o) countries.push(o[s])
}, 
this.beforespawn = function (e) {
    let i = e.socket.remoteAddress,t = geoip.lookup(i);
    return t && null != t ? countries.indexOf(t.country) > -1 : "127.0.0.1" == i
}, module.exports = this;