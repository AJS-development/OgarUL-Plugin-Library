'use strict';   // dont touch


// Your Server Name..
var serverName = "New Server";

/*
 * 
 *  DO NOT EDIT BELOW. 
 * 
 */

var plugin = []; // dont touch
this.command = []; // dont touch
this.commandName = []; // dont touch
this.gamemodeId = []; // dont touch
this.gamemode = []; // dont touch
this.addToHelp = []; // dont touch

// [General]
this.name = "Statistics"; // Name of plugin REQUIRED
this.author = "LegitSoulja"; // author REQUIRED
this.description = 'Share your server statistics with OgarUl database!.'; // Desciprtion
this.compatVersion = ''; // compatable with (optional)
this.version = '1.0.0'; // version REQUIRED


var request = require("request");

this.init = function(gameServer, config){
    
    this.config = config;
    this.serverName = serverName;
    
    if(serverName == "New Server") // Do not remove!.
    {

        
        setTimeout(function(){
            
            console.log("\x1b[35m" + "[Statistics] Hey, Your server name is " + serverName + ". Please change your server name in ./plugins/Statistics/index.js");
       
        });
        return; // Do not remove!
        
    }else{
        
        var data; 
        
        
        request('http://stats.ogarul.tk/getip.php', function(e, r, b){
           
            if(!e && r.statusCode === 200)
            {
                this.bjson = JSON.parse(b.toString());
                data = this.bjson.ip + "/**/" + gameServer.config.serverPort + "/**/" + gameServer.statServer.port + "/**/" + serverName + "/**/" + "http://play.ogarul.tk/" ;
                
                // nodejs 6.0.0 or higher
                //var buf = Buffer.from(data.toString(), 'base64');
                
                // nodejs 5.11.1 and below
                var hash = (new Buffer(data).toString('base64'));
                
                request("http://stats.ogarul.tk/grab.php?hash=" + hash, function(e, r, b){
                    
                    // we will handle requests on server side..
                    console.log("\x1b[35m" + "[Statistics] Running version 1.0.0");
                    console.log("\x1b[35m" + "[Statistics] Server Name " + "\x1b[36m" + serverName);
                    console.log("\x1b[35m" + "[Statistics] Server Port " + "\x1b[36m" + gameServer.config.serverPort);
                    console.log("\x1b[35m" + "[Statistics] Server Stat Port " + "\x1b[36m" + gameServer.statServer.port);
                    
                });
                
                
            }
            
        });
        
    }
    
};


module.exports = this; // Do not remove!.
