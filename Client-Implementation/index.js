'use strict';   // dont touch
var fs = require('fs');
var request = require("request");
var exec = require('child_process').exec;
var plugin = []; // dont touch
this.command = []; // dont touch
this.commandName = []; // dont touch
this.gamemodeId = []; // dont touch
this.gamemode = []; // dont touch
this.addToHelp = []; // dont touch

// [General]
this.name = "Client Implementation"; // Name of plugin REQUIRED
this.author = "Andrews54757"; // author REQUIRED
this.description = 'Adds the client into ogar ul'; // Desciprtion
this.compatVersion = ''; // compatable with (optional)
this.version = '1.1.0'; // version REQUIRED

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
  port: process.env.PORT,
  
}
this.configfile = 'config.ini'
this.download = function(url, dest) {
request(url, function (error, response, body) {
      if (!error && response.statusCode == 200 && body != "") {
        fs.writeFile(dest, body, (err, res)=> {
        });
      }
});
}

// [Functions]
this.init = function (gameServer, config) {
  this.config = config;
  if (!fs.existsSync('./Howtouseclient.md')) {
    fs.mkdir('./client')
    console.log("[Console] Downloading Files");
    this.download('https://raw.githubusercontent.com/AJS-development/clientimp/master/package.json','../package.json');
    this.download('https://raw.githubusercontent.com/AJS-development/clientimp/master/README.md','./Howtouseclient.md');

    setTimeout(function() {
     
      console.log('[Update] Running npm install to install new node modules!');
    var child = exec("npm install", function (error, stdout, stderr) {
      if (error !== null) {
        console.error('[Execution Error] Failed to run npm install  Reason: ', error);
        console.error('[Execution Error] You should exit the server and run: npm install');
      } else {
        console.log("[Console] Client installed successfuly! See howtouseclient.md for instructions. Configs are in config.ini")
        process.exit(0);
      }
    });
    }, 3000);
    
  } else {
    // CLIENT CONFIGS
// port
var port = config.port


try {
if (gameServer.isMaster) {
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static('./client/'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '127.0.0.1';
var serverport = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || port;
if (process.env.OPENSHIFT_NODEJS_IP !== undefined) {
    http.listen( serverport, ipaddress, function() {
        console.log('[CLient] Listening on *:' + serverport);
    });
} else {
    http.listen( serverport, function() {
        console.log('[Client] Listening on *:' + port);
    });
    http.on('error', function err(e) {


});
}
}
} catch (e) {
  console.log("[Client] Couldnt start client. Reason: " + e);
  
}
  }
  
  
  // init, Used to do stuff such as overriding things


};

this.onSecond = function (gameServer) {

  // called every second
};


module.exports = this; // dont touch
