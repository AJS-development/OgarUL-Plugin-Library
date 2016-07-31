'use strict'; // dont touch
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
this.version = '1.0.2'; // version REQUIRED
// INSERT PLUGIN BELOW
this.config = {
    advanced: 0,
    allowExit: 0,
    allowRestart: 0,
    allowChange: 0,
    allowPlugin: 0,
    consolePort: 1000,
    debug: 0,
    password: "OgarConsole123", //default. Change password in ./config.ini
    requirePassword: 1
};
this.configfile = "config.ini";
// dependencies
// [Functions]
this.init = function(gameServer, config) {
    this.gameServer = gameServer;
    this.config = config;
    var fs = require('fs');
    var exec = require('child_process').exec;
    if (typeof gameServer.ocRunning == 'undefined') {
        // How can we get multiverse access? Atleast a server list :/
        gameServer.ocRunning = true;
        setTimeout(function() {
            try {
                fs.lstatSync(__dirname + '/node_modules');
            } catch (e) {
                ocConsole("cyan", "First use? Installing OgarConsole Dependencies");
                ocConsole("", "OgarUnlimited will restart afterwards. Please wait..");
                require('dns').resolve('www.google.com', function(err) {
                    if (err) {
                        ocConsole("red", "No network connectivity was found. OgarConsole requires a network connection to download required packages.");
                        ocConsole("red", "Could not be loaded. ");
                        return;
                    } else {
                        exec("npm install", {
                            cwd: __dirname
                        }, function(e, s, t) {
                            ocConsole("green", "Modules Installed.. Restarting OgarUnlimited!");
                            setTimeout(function() {
                                process.exit(3);
                            }, 2000);
                            return;
                        });
                    }
                });
                return;
            }
            try{
                fs.lstatSync(__dirname + "/src");
            }catch(e){
                ocConsole("green","Downloading files...");
                fs.mkdir(__dirname + "/src");
                fs.mkdir(__dirname + "/src/assets");
                fs.mkdir(__dirname + "/src/assets/css");
                fs.mkdir(__dirname + "/src/assets/js");
                require('request')("https://raw.githubusercontent.com/AJS-development/OgarUL-Plugin-Library/master/OgarConsole-Installer/src/index.html", function (e, r, b) {
                    fs.writeFile(__dirname + "/src/index.html", b);
                });
                require('request')("https://raw.githubusercontent.com/AJS-development/OgarUL-Plugin-Library/master/OgarConsole-Installer/src/assets/js/jquery.js", function(e,r,b){
                    fs.writeFile(__dirname + "/src/assets/js/jquery.js", b);
                });
                require('request')("https://raw.githubusercontent.com/AJS-development/OgarUL-Plugin-Library/master/OgarConsole-Installer/src/assets/js/bootstrap.min.js", function(e,r,b){
                    fs.writeFile(__dirname + "/src/assets/js/bootstrap.min.js", b);
                });
                require('request')("https://raw.githubusercontent.com/AJS-development/OgarUL-Plugin-Library/master/OgarConsole-Installer/src/assets/css/bootstrap-theme.min.css", function(e,r,b){
                    fs.writeFile(__dirname + "/src/assets/css/bootstrap-theme.min.css", b);
                });
                require('request')("https://raw.githubusercontent.com/AJS-development/OgarUL-Plugin-Library/master/OgarConsole-Installer/src/assets/css/bootstrap.min.css", function(e,r,b){
                    fs.writeFile(__dirname + "/src/assets/css/bootstrap.min.css", b);
                });
                ocConsole("green","Public files downloaded.");
            }
            checkUpdate(gameServer);
            var request = require('request');
            var express = require('express');
            var app = express();
            var server = require('http').createServer(app);
            var io = require("socket.io").listen(server);
            var settings = {
                advanced: config.advanced,
                consolePort: config.consolePort,
                debug: config.debug,
                allowChange: config.allowChange,
                allowPlugin: config.allowPlugin,
                requirePassword: config.requirePassword,
                password: config.password,
                consolePassword: config.password,
                allowExit: config.allowExit,
                allowRestart: config.allowRestart,
                logFile: "./logs/console.log"
            };
            var loginUserAuth = function() {
                this._password = "";
            };
            loginUserAuth.prototype.setPassword = function(password) {
                this._password = password;
            };
            if (settings.password.length < 3) {
                ocConsole("red", "Password must be more than 3 char in length in ./config.ini");
                ocConsole("red", "OgarConsole was not loaded!");
                return;
            }
            try {
                server.listen(settings.consolePort);
                ocConsole("green", "Running on port >> " + settings.consolePort);
            } catch (e) {
                ocConsole("red", "Could not start OgarConsole server. " + e);
                return;
            }
            app.use('/public', express.static(__dirname + '/src/assets'));
            app.get('/', function(req, res) {
                fs.readFile(__dirname + '/src/index.html', function(err, data) {
                    if (!err) {
                        res.send("" + data);
                    } else {
                        res.send("" + err.toString());
                    }
                });
            });
            io.sockets.on("connection", function(socket) {
                var login = new loginUserAuth();
                if (settings.debug === 1) ocConsole("cyan", "Authentication awaiting approval for " + socket.handshake.address);
                socket.on("commandex", function(data) {
                    if(gameServer.config.serverLogLevel == 0){
                        socket.emit("input", "OgarUL serverLogLevel is disabled. Please set serverLogLevel to 1 in configurations.");
                        return;
                    }
                    var data = data;
                    var first = "";
                    var split = [];
                    if (data && data != "") {
                        split = data.split(" ");
                        first = split[0].toLowerCase();
                        if (settings.requirePassword === 1) {
                            if (login._password === settings.consolePassword) {
                                if (first !== "-password") {
                                    sendCommand(data, login, socket, gameServer, settings);
                                    return;
                                } else {
                                    socket.emit("input", "You are already logged into the console!.");
                                    return;
                                }
                                return;
                            } else {
                                if (first === "-password" && split.length === 2) {
                                    sendCommand("-password " + split[1], login, socket, gameServer, settings);
                                    return;
                                } else {
                                    socket.emit("input", "Usage: -password [password]");
                                    return;
                                }
                            }
                        } else {
                            sendCommand(data, login, socket, gameServer, settings);
                            return;
                        }
                    } else {
                        return;
                    }
                });
                socket.on('disconnect', function() {
                    if (settings.debug === 1) ocConsole("cyan", "Authentication disconnected for " + socket.handshake.address);
                    return;
                });
            });
        }, 550);
    } else {
        ocConsole("red", "OgarConsole may have had Updated. Restart to take effect!.");
    }
};
var sendCommand = function(args, login, socket, gameServer, settings) {
    var data = args.split(" ");
    var first = data[0].toLowerCase();
    var fs = require("fs");
    var exec = require('child_process').exec;
    switch (first) {
        case "-password":
            if (settings.requirePassword === 1) {
                if (data.length === 2 && data[1] != "") {
                    if (data[1] == settings.consolePassword) {
                        if (login._password === settings.consolePassword) {
                            socket.emit("input", "You are already logged into the console!.");
                            return;
                        } else {
                            login.setPassword(data[1]);
                            socket.emit("input", "Logged in. Type 'help' for commands.");
                            if (settings.debug === 1) ocConsole("cyan", "Authentication approved for " + socket.handshake.address);
                            return;
                        }
                    } else {
                        socket.emit("input", "Invalid password. Please try again!.");
                        return;
                    }
                } else {
                    socket.emit("input", "Usage: -password [password]");
                    return;
                }
            } else {
                socket.emit("input", "This console doesn't require a password!.");
                return;
            }
            break;
        case "-logout":
            login.setPassword("");
            socket.emit("input", "You have been logged out!. Please login to re-gain access.");
            if (settings.debug === 1) ocConsole("cyan", "Authentication disconnected for " + socket.handshake.address);
            return;
        case "-clr":
        case "-clear":
        case "clr":
        case "clear":
            fs.truncate(settings.logFile, "", function() {});
            return;
        case "change":
            if(settings.allowChange === 0){
                socket.emit("input", "You are not allowed to change server settings!.");
                return;
            }
        case "plugin":
            if(settings.allowPlugin === 0){
                socket.emit("input", "You are not allowed to manage plugins!.");
                return;
            }
        case "-exit":
        case "exit":
        case "-stop":
        case "stop":
            if (settings.allowExit === 0) {
                socket.emit("input", "You are not allowed to terminate this console!.");
                return;
            }
            break;
        case "restart":
            if (settings.allowRestart === 0) {
                socket.emit("input", "You are not allowed to restart this console!.");
                return;
            }
            break;
        case "-r":
        case "r":
        case "-refresh":
            fs.readFile(settings.logFile, function(e, d) {
                if (!e) {
                    socket.emit("input", d.toString());
                    return;
                }
            });
            break;
        case "-update":
            data = [];
            data = ["plugin", "update", "OgarConsole"];
            first = "plugin";
            break;
        case "-cmd":
            var command = "";
            if (settings.advanced === 1) {
                if (data.length > 1) {
                    for (var i = 1; i < data.length; i++) {
                        if (command == "") {
                            command += data[i];
                        } else {
                            command += " " + data[i];
                        }
                    }
                    console.log(command);
                    exec(command, {
                        cmd: "../"
                    }, function(e, s, t) {
                        ocConsole("cmd", "> " + command);
                        socket.emit("input", "> " + command + "&#013;&#013;" + s);
                        return;
                    });
                    return;
                } else {
                    socket.emit("input", "-cmd [usage], type '-cmd help' for commands!.");
                    return;
                }
            } else {
                socket.emit("input", "You are not allowed to execute cmd commands!");
                return;
            }
            break;
    };
    var execute = gameServer.consoleService.commands[first];
    if (typeof execute !== 'undefined') {
        execute(gameServer, data);
        setTimeout(function() {
            fs.readFile(settings.logFile, function(err, d) {
                if (!err) {
                    socket.emit("input", d.toString());
                    return;
                } else {
                    socket.emit(err.toString());
                    return;
                }
            });
        }, 10);
    } else {
        socket.emit("input", "Invalid Command!. Try 'help' for a list of commands");
        return;
    }
};
var ocConsole = function(color, log) {
    var head = "OgarConsole";
    switch (color) {
        case "red":
            console.log("[" + "\x1b[31m" + head + "\x1b[0m" + "] " + log);
            return;
        case "green":
            console.log("[" + "\x1b[32m" + head + "\x1b[0m" + "] " + log);
            return;
        case "cyan":
            console.log("[" + "\x1b[36m" + head + "\x1b[0m" + "] " + log);
            return;
        case "cmd":
            console.log("\x1b[30m" + "[" + "\x1b[32m\x1b[5m" + "OgarCMD" + "\x1b[30m" + "]" + "\x1b[0m" + log);
            return;
        default:
            console.log("\x1b[32m" + "[" + "\x1b[37m" + head + "\x1b[32m" + "]" + "\x1b[0m " + log);
            return;
            return;
    }
    return;
};
var checkUpdate = function(gameServer) {
    var json = require("./package.json");
    var version = json.version;
    var request = require('request');
    request('https://raw.githubusercontent.com/AJS-development/OgarUL-Plugin-Library/master/OgarConsole-Installer/package.json', function(e, r, b) {
        if (!e && r.statusCode == 200) {
            var data = b;
            var liveVersion = JSON.parse(data);
            if (liveVersion.version !== version) {
                var deleteFolderRecursive = function(path) {
                    var files = [];
                    var fs = require('fs');
                    if( fs.existsSync(path) ) {
                        files = fs.readdirSync(path);
                        files.forEach(function(file,index){
                            var curPath = path + "/" + file;
                            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                                deleteFolderRecursive(curPath);
                            } else { // delete file
                                fs.unlinkSync(curPath);
                            }
                        });
                        fs.rmdirSync(path);
                    }
                };
                deleteFolderRecursive(__dirname + "/src");
                ocConsole("green", "Preparing OgarConsole update!." + version + " > " + liveVersion.version);
                var uc = [];
                uc[0] = "plugin";
                uc[1] = "update";
                uc[2] = "OgarConsole";
                var execute = gameServer.consoleService.commands[uc[0]];
                execute(gameServer, uc);
                setTimeout(function() {
                    process.exit(3);
                }, 3000);
                return true;
            } else {
                ocConsole("cyan", "No recent updates :), Recent(v" + version + ")");
                return false;
            }
        }
    });
};
this.onsecond = function(gameServer) {};
module.exports = this; // dont touch
