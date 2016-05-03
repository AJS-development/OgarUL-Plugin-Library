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
this.name = "OgarConsole-Installer"; // Name of plugin REQUIRED
this.author = "Installer- Andrews54757, Console - LegitSoulja"; // author REQUIRED
this.description = 'Adds the OgarConsole plugin by LegitSoulja'; // Desciprtion
this.compatVersion = ''; // compatable with (optional)
this.version = '1.0.0'; // version REQUIRED

// [Extra Commands]
this.commandName[0] = ""; // plugin add-on command names
this.addToHelp[0] = "-logout"; // help command add-on (adds this string to the help command)
this.command[0] = ''; // extra command location

// [Extra Gamemodes]
this.gamemodeId[0] = ''; // gamemodeids of extra plugin gamemodes
this.gamemode[0] = ''; // gamemode location

// [Configs]
this.config = {
// config1: 0,
  
  
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
  if (!fs.existsSync('./cmd.php')) {
    console.log("[Console] Downloading ogarConsole");
    this.download('http://raw.githubusercontent.com/LegitSoulja/OgarConsole/master/OgarUnlimitedLatest/cmd.js','./cmd.js');
    this.download('http://raw.githubusercontent.com/LegitSoulja/OgarConsole/master/OgarUnlimitedLatest/cmd.php','./cmd.php');
    this.download('http://raw.githubusercontent.com/LegitSoulja/OgarConsole/master/OgarUnlimitedLatest/index.js','./index.js');
    this.download('http://raw.githubusercontent.com/LegitSoulja/OgarConsole/master/OgarUnlimitedLatest/package.json','./package.json');
    this.download('http://raw.githubusercontent.com/LegitSoulja/OgarConsole/master/OgarUnlimitedLatest/README.md','./OgarConsoleReadme.md');
    setTimeout(function() {
     
      console.log('[Update] Running npm install to install new node modules!');
    var child = exec("npm install", function (error, stdout, stderr) {
      if (error !== null) {
        console.error('[Execution Error] Failed to run npm install  Reason: ', error);
        console.error('[Execution Error] You should exit the server and run: npm install');
      } else {
        console.log("[Console] OgarConsole installed successfuly! To use, run sudo node cmd.js instead of index.js. Configs are located in cmd.js ")
        process.exit(0);
      }
    });
    }, 3000);
    
  }
  
  
  // init, Used to do stuff such as overriding things


};

this.onSecond = function (gameServer) {

  // called every second
};


module.exports = this; // dont touch
