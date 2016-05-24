'use strict';   // dont touch
this.command = []; // dont touch
this.commandName = []; // dont touch
this.gamemodeId = []; // dont touch
this.gamemode = []; // dont touch
this.addToHelp = []; // dont touch

// [General]
this.name = "OgarConsole"; // Name of plugin REQUIRED
this.author = "LegitSoulja"; // author REQUIRED
this.description = 'Control Your OgarUL Servers'; // Desciprtion
this.compatVersion = ''; // compatable with (optional)
this.version = '1.0.0'; // version REQUIRED

// INSERT PLUGIN BELOW

this.config = {
    
    advanced: 0,
    allowExit: 0,
    allowRestart: 0,
    consolePort: 1000,
    password: "OgarConsole123", //default. Change password in ./config.ini
    requirePassword: 1
    
    
};

this.configfile = "config.ini";


// dependencies

// [Functions]
this.init = function (gameServer, config) {
    
    this.gameServer = gameServer;
    this.config = config;
    
    var fs = require('fs');
    var exec = require('child_process').exec;
    
    if(typeof running == 'undefined')
    {
        var running = true;
        setTimeout(function(){
            
            try{

                fs.lstatSync(__dirname + '/node_modules');

            }catch(e){

                ocConsole("cyan", "First use? Installing OgarConsole Dependencies");
                ocConsole("", "OgarUnlimited will restart afterwards. Please wait..");

                exec("npm install", {cwd: __dirname}, function(e,s,t)
                {

                    ocConsole("green", "Modules Installed.. Restarting OgarUnlimited!");
                    setTimeout(function() { process.exit(3); }, 2000);
                    return;

                });
                
                return;

            }

            checkUpdate(gameServer);


            var request = require('request');
            var express = require('express');
            var app = express();
            var server = require('http').createServer(app);
            var io = require("socket.io").listen(server);

            var settings = {

              consolePort: config.consolePort,
              requirePassword: config.requirePassword,
              password: config.password,
              consolePassword: config.password,
              advanced: config.advanced,
              allowExit: config.allowExit,
              allowRestart: config.allowRestart,
              logFile: "./logs/console.log"

            };

            var loginUserAuth = function() { this._password = "" };
            loginUserAuth.prototype.setPassword = function(password){ this._password = password; };

            if(settings.password.length < 3){

                ocConsole("red", "Password must be more than 3 char in length in ./config.ini");
                ocConsole("red", "OgarConsole was not loaded!");
                return;

            }

            try
            {

                server.listen(settings.consolePort);
                ocConsole("green", "Running on port >> " + settings.consolePort);

            }catch(e){

                ocConsole("red", "Could not start OgarConsole server. " + e);
                return;

            }
            
            app.get('/', function(req, res){
               
                fs.readFile(__dirname + '/cmd.ejs', function(err, data){
                    
                    if(!err)
                    {
                        
                        res.send("" + data);
                        
                    }else{
                        
                        res.send("" + err.toString());
                        
                    }
                    
                });
                
            });
            
            io.sockets.on("connection", function(socket){
                
                var login = new loginUserAuth();
                
                socket.on("commandex", function(data){
                   
                   var data = data;
                   var first = "";
                   var split = [];
                   
                   if(data && data != ""){ 
                       
                       split = data.split(" ");
                       first = split[0].toLowerCase();
                       
                       if(settings.requirePassword === 1){
                           if(login._password === settings.consolePassword){
                               
                               if(first !== "-password"){
                                   
                                   sendCommand(data, login, socket, gameServer, settings);
                                   return;
                                   
                               }else{
                                   
                                   socket.emit("input", "You are already logged into the console!.");
                                   return;
                                   
                               }
                               return;
                               
                           }else{
                               
                               if(first === "-password" && split.length === 2){
                                   
                                   sendCommand("-password " + split[1], login, socket, gameServer, settings);
                                   return;
                                   
                               }else{
                                   socket.emit("input", "Usage: -password [password]");
                                   return;
                                   
                               }
                               
                           }
                           
                       }else{
                           
                           sendCommand(data, login, socket, gameServer, settings);
                           return;
                           
                       }
                       
                   }else{
                       
                       return;
                       
                   }
                    
                });
                
            });
            
        }, 2000);
        
    }else{
        
        return;
        
    }
    

};
var sendCommand = function(args, login, socket, gameServer, settings){
    
    var data = args.split(" ");
    var first = data[0].toLowerCase();
    var fs = require("fs");
    
    switch(first){
        
        case "-password":
            if(settings.requirePassword === 1){
                
                if(data.length === 2 && data[1] != ""){
                    
                    if(data[1] === settings.consolePassword){
                        
                        if(login._password === settings.consolePassword){
                            
                            socket.emit("input", "You are already logged into the console!.");
                            return;
                            
                        }else{
                            
                            login.setPassword(data[1]);
                            socket.emit("input", "Logged in. Type 'help' for commands.");
                            return;
                            
                        }
                        
                    }else{
                        
                        socket.emit("input", "Invalid password. Please try again!.");
                        return;
                        
                    }
                    
                }else{
                    
                    socket.emit("input", "Usage: -password [password]");
                    return;
                    
                }
                
            }else{
                
                socket.emit("input", "This console doesn't require a password!.");
                return;
                
            }
            break;
        case "-logout":
            login.setPassword("");
            socket.emit("input", "You have been logged out!. Please login to re-gain access.");
            return;
        case "clr":
            fs.truncate(settings.logFile, "", function(){});
            return;
        case "clear":
            fs.truncate(settings.logFile, "", function(){});
            return;
        case "exit":
            if(settings.allowExit === 0)
            {
                socket.emit("input", "You are not allowed to terminate this console!.");
                return;
            }
            break;
        case "stop":
            if(settings.allowExit === 0)
            {
                socket.emit("input", "You are not allowed to terminate this console!.");
                return;
            }
            break;
        case "restart":
            if(settings.allowRestart === 0)
            {
                socket.emit("input", "You are not allowed to restart this console!.");
                return;
            }
            break;
        case "-update":
            data = [];
            data = ["plugin", "update", "OgarConsole"];
            first = "plugin";
            break;
    }
    
    var execute = gameServer.consoleService.commands[first];
    if(typeof execute !== 'undefined'){
        
        execute(gameServer, data);
        setTimeout(function(){
            
            fs.readFile(settings.logFile, function(err, d){
                
                if(!err){
                    socket.emit("input", d.toString());
                    return;
                    
                }else{
                    socket.emit(err.toString());
                    return;
                    
                }
                
            });
            
        }, 10);
        
    }else{
        
        socket.emit("input", "Invalid Command!. Try 'help' for a list of commands");
        return;
        
    }
    
};
var ocConsole = function(color, log){
    
    var head = "OgarConsole";
    switch(color){
        
        case "red":
            console.log("[" + "\x1b[31m" + head + "\x1b[0m" + "] " + log);
            break;
        case "green":
            console.log("[" + "\x1b[32m" + head + "\x1b[0m" + "] " + log);
            break;
        case "cyan":
            console.log("[" + "\x1b[36m" + head + "\x1b[0m" + "] " + log);
            break;
        default:
            console.log("\x1b[32m" + "[" + "\x1b[37m" + head + "\x1b[32m" + "]" + "\x1b[0m " + log);
            break;
            
    }
    
};

var checkUpdate = function(gameServer){
    
  var json = require("./package.json");
  var version = json.version;
  var request = require('request');
  
  request('https://raw.githubusercontent.com/AJS-development/OgarUL-Plugin-Library/master/OgarConsole-Installer/package.json', function(e, r, b){
      
      if(!e && r.statusCode == 200){
          
          var data = b;
          var liveVersion = JSON.parse(data);
          
          if(liveVersion.version !== version){
              
              ocConsole("green", "Preparing OgarConsole update!." + version + " > " + liveVersion.version);
              var uc = [];
              uc[0] = "update";
              uc[1] = "OgarConsole";
              
              var execute = gameServer.consoleService.commands[uc[0]];
              execute(gameServer, uc);
              return true;
              
          }else{
              
              ocConsole("cyan", "No recent updates :)");
              return false;
              
          }
          
      }
      
  });
    
};


this.onsecond = function(gameServer) {


};
module.exports = this; // dont touch