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
this.compatVersion = '17.2.3'; // compatable with (optional)
this.version = '1.0.0'; // version REQUIRED

// [Extra Commands]
this.commandName[0] = "ads"; // plugin add-on command names
this.addToHelp[0] = "ads     | Ads plugin command"; // help command add-on (adds this string to the help command)
this.command[0] = function(gameServer,split) {
if (split[1] == "reload") {
  console.log("[Console] Reloading ads...")
   try {
  gameServer.ads = JSON.parse(fs.readFileSync(__dirname + "/ads.json"));
  console.log("[Console] Loaded ads");
   } catch (e) {
     console.log("[Console] Failed to load ads, Reason: " + e);
     
   }
  
} else if (split[1] == "power") {
  gameServer.adson = !gameServer.adson;
  var text = (gameServer.adson) ? " turned on " : " turned off ";
  console.log("[Console]" + text + "advertisements")
} else {
  console.log("[Console] Available commands");
  console.log("[Console] Reload - Reload ads");
  console.log("[Console] Power  - Turn on/off ads");
}
  
  
}; // extra command location

// [Extra Gamemodes]
this.gamemodeId[0] = ''; // gamemodeids of extra plugin gamemodes
this.gamemode[0] = ''; // gamemode location

// [Configs]
this.config = {
// config1: 0,
  
  
}


// [Functions]
this.init = function (gameServer, config) {
  this.timer = 0;
  this.adindex = 0;
  gameServer.adson = true;
  this.config = config;
   console.log("[Console] Loading ads...")
   try {
  gameServer.ads = JSON.parse(fs.readFileSync(__dirname + "/ads.json"));
  console.log("[Console] Loaded ads");
   } catch (e) {
     console.log("[Console] Failed to load ads, Reason: " + e);
     
   }
  // init, Used to do stuff such as overriding things


};
this.genHTML = function(ad) {
// please do not get rid of the made by ads plugin notice, it is to show moneyclip that we are not getting money
  var result = '';
   if (!ad.data) return '';
  var click = (ad.link) ? "<a href=\"" + ad.link + "\">" : "";
  var end = (ad.link) ? "</a>" : "";
  if (ad.type == "image") {

    if (ad.dimx && ad.dimy) {
      result = "<center>" + click + "<img src=\"" + ad.data + "\" width=\""+ ad.dimx + "\" height=\"" + ad.dimy +"\"></img>"+ end + "</center><br><font size=\"1\">Ads by the ads plugin. Ads not owned by AJS</font>";
    } else {
        result = "<center>" + click + "<img src=\"" + ad.data + "\" width=\"200\" height=\"130\"></img>"+ end + "</center><br><font size=\"1\">Ads by the ads plugin. Ads not owned by AJS</font>";
    }
    
  } else if (ad.type == "text") {
   
    result =  "<center>" + click + "<h3>" + ad.data + "</h3>"+ end + "</center><br><font size=\"1\">Ads by the ads plugin. Ads not owned by AJS</font>";
    
  } else if (ad.type == "custom") {
    result = ad.data + "<br><font size=\"1\">Ads by the ads plugin. Ads not owned by AJS</font>";
  }
  return result;
};
this.sendpacket = function(html, gameServer) {
  var data = {
    customHTML: html,
  };
  for (var i in gameServer.clients) {
    var client = gameServer.clients[i];
    if (client) client.sendPacket(new Cpacket(gameServer,data));
    
  }
  
  
};
this.onSecond = function (gameServer) {
  if (!gameServer.adson) return;
this.timer++;
var ads = gameServer.ads
if (gameServer.ads) {
var ad = gameServer.ads[this.adindex];
  if (this.timer >= ad.duration) {
    if (ads[this.adindex + 1]) {
      this.adindex ++;
    } else {
      this.adindex = 0;
    }
    
   var ht = this.genHTML(ads[this.adindex]);
    this.sendpacket(ht,gameServer);
    this.timer = 0;
  }
  
}


  // called every second
};


module.exports = this; // dont touch
