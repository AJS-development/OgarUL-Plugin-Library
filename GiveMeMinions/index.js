'use strict';   // dont touch
var plugin = []; // dont touch
this.command = []; // dont touch
this.commandName = []; // dont touch
this.gamemodeId = []; // dont touch
this.gamemode = []; // dont touch
this.addToHelp = []; // dont touch

// [General]
this.name = "GiveMeMinions"; // Name of plugin REQUIRED
this.author = "LegitSoulja"; // author REQUIRED
this.description = 'Give random players minions'; // Desciprtion
this.compatVersion = ''; // compatable with (optional)
this.version = '1.0.0'; // version REQUIRED

this.config = {
    
    switchIntervalTime: 60000, // Every Minute
    minionGiveAmount: 10
    
};

this.configfile = 'config.ini';

this.init = function(gameServer, config){
    
  this.gameServer = gameServer;
  this.config = config;
  this.stop = true;
  
  function goooo(){
      
      var last = 0;
      var ids = [];

      
      setInterval(function(){
         
         console.log(last);
          
          if(gameServer.running){
              
            if(last => 0){

              var remCommand = [];
              remCommand[1] = last;

              var remAll = [];
              remAll[1] = "destroy";
              gameServer.consoleService.execCommand("minion", remCommand);
              gameServer.consoleService.execCommand("minion", remAll);

            }

            setTimeout(function(){
                
                ids.length = 0;
                
                // Wait a few seconds so leaderboard can clear...
                for(var a = 0; a < gameServer.clients.length; a++){

                    var client = gameServer.clients[a].playerTracker;
                    
                    if(typeof gameServer.clients[a].remoteAddress != 'undefined'){
                        
                        ids.push(client.pID);
                        
                    }

                }
                
                var players = ids.length;

                if(players > 0){


                  //console.log("Found " + players + "clients");

                  var r = Math.floor((Math.random() * players) + 0);

                  console.log("Selecting " + r + "::" + ids[r]);

                  var givCommand = [];
                  givCommand[1] = ids[r];
                  givCommand[2] = config.minionGiveAmount;
                  gameServer.consoleService.execCommand("minion", givCommand);
                  
                  last = ids[r];
                  
                  ids.length = 0;


                  


              }else{

                  // IDLE, Runs when there's no active players.

              }

            }, 2000);
              
          }

      }, config.switchIntervalTime + 2000);
      
  };
  
  setInterval(function(){
      
      if(gameServer.running === true){
          
          if(this.stop){
              
              goooo();
              this.stop = false;
              return;
              
          }
          
      }else{
          
          this.stop = true;
          return;
          
      }
      
  }, 1000);
    
};


module.exports = this;
