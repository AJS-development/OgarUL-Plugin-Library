'use strict';   // dont touch
const Cpacket = require('../../packet').ClientPacket;
const fs = require('fs');
var plugin = []; // dont touch
this.command = []; // dont touch
this.commandName = []; // dont touch
this.gamemodeId = []; // dont touch
this.gamemode = []; // dont touch
this.addToHelp = []; // dont touch
this.timer = 0;
this.adindex = 0;
// [General]
this.name = "Ads plugin"; // Name of plugin REQUIRED
this.author = "Andrews54757"; // author REQUIRED
this.description = 'Host your own ads!'; // Desciprtion
this.compatVersion = ''; // compatable with (optional)
this.version = '1.0.0'; // version REQUIRED

// [Extra Commands]
this.commandName[0] = ""; // plugin add-on command names
this.addToHelp[0] = ""; // help command add-on (adds this string to the help command)
this.command[0] = ''; // extra command location

// [Extra Gamemodes]
this.gamemodeId[0] = ''; // gamemodeids of extra plugin gamemodes
this.gamemode[0] = ''; // gamemode location

// [Configs]
this.config = {
// config1: 0,
  
  
}
this.configfile = 'config.ini'


// [Functions]
this.init = function (gameServer, config) {
  this.timer = 0;
  this.adindex = 0;
  this.config = config;
   console.log("[Console] Loading ads...")
   try {
  this.ads = JSON.parse(fs.readFileSync(__dirname + "/ads.json"));
   } catch (e) {
     console.log("[Console] Failed to load ads")
     
   }
  // init, Used to do stuff such as overriding things


};
this.genHTML = function(ad) {
  var result = '';
   if (!ad.data) return '';
  var click = (ad.link) ? " href=\"" + ad.link + "\"";
  if (ad.type == "image") {

    if (ad.dimx && ad.dimy) {
      result = "<center><a" + click + "><img src=\"" + ad.data + "\" width=\""+ ad.dimx + "\" height=\"" + ad.dimy +"\"></img></a></center>";
    } else {
        result = "<center><a" + click + "><img src=\"" + ad.data + "\" width=\"200\" height=\"130\"></img></a></center>";
    }
    
  } else if (ad.type = "text") {
   
    result =  "<center><a" + click + "><h3>" + ad.data + "</h3></a></center>";
    
  }
  
};
this.sendpacket = function(html, gameServer) {
  
  
  
};
this.onSecond = function (gameServer) {
this.timer++;
var ads = this.ads;
if (this.ads) {
var ad = this.ads[this.adindex];
  if (this.timer >= ad.duration) {
    if (ads[this.adindex + 1]) {
      this.adindex ++;
    } else {
      this.adindex = 0;
    }
    
   var ht = this.genHTML(ads[this.adindex]);
    this.sendpacket(ht,gameServer);
  }
  
}


  // called every second
};


module.exports = this; // dont touch
