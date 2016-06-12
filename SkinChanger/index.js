'use strict'; // dont touch
const fs = require('fs');
this.command = []; // dont touch
this.commandName = []; // dont touch
this.gamemodeId = []; // dont touch
this.gamemode = []; // dont touch
this.addToHelp = []; // dont touch
this.addToHelp[1] = "Skin Changer (SC) - LegitSoulja";
this.addToHelp[2] = "sc [add,rem] [id]";
this.addToHelp[3] = "sc reset     : Reset added id list";
this.addToHelp[4] = "Skin <sc> available in game!."
this.addToHelp[4] = "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~";
// [General]
this.name = "SkinChanger"; // Name of plugin REQUIRED
this.author = "LegitSoulja"; // author REQUIRED
this.description = 'SkinChanger FTW!'; // Desciprtion
this.compatVersion = ''; // compatable with (optional)
this.version = '1.0.2'; // version REQUIRED
// [Commands]
this.commandName[1] = "sc";
this.command[1] = function(gameServer, split) {
    if (split.length >= 2) {
        var first = split[1].toLowerCase();
        switch (first) {
            case "add":
                if (!isNaN(split[2])) {
                    if (ids.indexOf(parseInt(split[2])) > -1) {
                        console.log("[RS] ID is already added.");
                        return true;
                    } else {
                        ids.push(parseInt(split[2]));
                        console.log("[RS] Added " + split[2]);
                        return true;
                    }
                } else {
                    console.log("[RS] Please give a valid ID.");
                    return true;
                }
                break;
            case "rem":
                if (!isNaN(split[2])) {
                    for (var i in ids) {
                        if (ids[i] === parseInt(split[2])) {
                            ids.splice(i, 1);
                            console.log("[RS] Removed " + split[2]);
                            return true;
                        }
                    }
                } else {
                    console.log("[RS] Please give a valid ID.");
                    return true;
                }
                break;
            case "reset":
                ids = [];
                console.log("[RS] All ID's was reset!.");
                return true;
            default:
                console.log("[RS] Usage: rs add [id]");
                console.log("[RS] Usage: rs rem [id]");
                console.log("[RS] Usage: rs reset");   
                return true;
        }
    } else {
        console.log("[RS] Usage: rs add [id]");
        console.log("[RS] Usage: rs rem [id]");
        console.log("[RS] Usage: rs reset");
        return true;
    }
};
this.config = {
    changeInterval: 1, // *60 in minutes. 1 minute default
    customSkins: 0, // false
    debug: 0, // false
    usersskin: 1
};
this.configfile = 'config.ini';
var ids = [];
var skins = [];
// [Functions]
this.init = function(gameServer, config) {
    this.gameServer = gameServer;
    this.config = config;
    if (parseInt(config.customSkins) === 0) {
        fs.readFile(__dirname + "/skins.txt", 'utf8', function(e, d) {
            if (!e) {
                if (d) {
                    var split = d.split(/\r?\n/);
                    for (var i in split) {
                        skins.push(split[i]);
                    }
                    randomSkin(gameServer, config);
                } else {
                    console.log("[RS] skins.txt file is empty. Please add skins.");
                    return;
                }
            } else {
                console.log("[RS] Could not find skins.txt");
                return;
            }
        });
    } else {
        fs.readFile(__dirname + "/customskins.txt", 'utf8', function(e, d) {
            if (!e) {
                if (d && d != "") {
                    var split = d.split(/\r?\n/);
                    for (var i in split) {
                        skins.push(split[i]);
                    }
                    randomSkin(gameServer, config);
                } else {
                    console.log("[RS] customskins.txt file is empty. Please add skins.");
                    return;
                }
            } else {
                console.log("[RS] Could not find customskins.txt");
                return;
            }
        });
    }
};
this.beforespawn = function(player){
    var name = player.name;
    if(this.config.usersskin == 1){
        if(name.substr(0,1) == "<"){
            if(name.substr(0,4) == "<sc>"){
                if(ids.indexOf(player.pID) > -1){
                    return true;
                }else{
                    ids.push(player.pID);
                    return true;
                }
                return true;
            }
            return true;
        }
        return true;
    }
    return true;
};
var randomSkin = function(gameServer, config) {
    setInterval(function() {
        if (gameServer.running) {
            for (var p = 0; p < ids.length; p++) {
                var rskin = Math.floor((Math.random() * skins.length) + 0);
                for (var c = 0; c < gameServer.clients.length; c++) {
                    var client = gameServer.clients[c].playerTracker;
                    if (client.pID === ids[p]) {
                        client.premium = "%" + skins[rskin];
                        if (config.debug == 1) {
                            console.log("[RS] " + client.pID + " Was given the skin " + skins[rskin]);
                        }
                    }
                }
            }
        }
    }, parseInt(config.changeInterval) * 1000); // minutes..
};
module.exports = this; // dont touch
