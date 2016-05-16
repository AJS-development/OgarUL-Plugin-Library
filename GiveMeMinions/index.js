'use strict';   // dont touch   // dont touch
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
this.version = '1.0.1'; // version REQUIRED

this.config = {
    
    switchIntervalTime: 10000, // Every Minute
    minionGiveAmount: 10,
    botGetMinions: 1, // 0 = false, 1 = true
    setPerInterval: 5

    
};

this.configfile = 'config.ini';

this.init = function(gameServer, config){
this.gameServer = gameServer;'use strict';
this.config = config;
this.stop = "";
var ids = [];
var last = [];
var players = 0;
  
  function goooo(){
      
      setInterval(function(){
         
          if(gameServer.running){
              
              
            if( last.length > 0){

                for(var perL = 0; perL <  last.length; perL++ ){
                    
                    var remCommand = [];
                    remCommand.length = 0;
                    remCommand[1] =  last[perL];

                    var remAll = [];
                    remAll.length = 0;
                    remAll[1] = "destroy";
                    
                    gameServer.consoleService.execCommand("minion", remCommand);
                    gameServer.consoleService.execCommand("minion", remAll);
                    
                }

            }

            setTimeout(function(){
 
                // reset arrays
                ids.length = 0;
                last.length = 0;
                
                // Wait a few seconds so leaderboard can clear...
                
                
                // Retrieve full list of clients
                for(var a = 0; a < gameServer.clients.length; a++){
                 
                    if(config.botGetMinions === 0){
                        
                        // Bots don't get minions.
                        
                        if(typeof gameServer.clients[a].remoteAddress != 'undefined'){

                            ids.push(gameServer.clients[a].playerTracker.pID);

                        }
                        
                    }else{
                        
                        // Bots do get minions
                        
                        ids.push(gameServer.clients[a].playerTracker.pID);
                        
                    }

                }
                
                players = ids.length;

                if(players > 0){
                    
                  var tlast = [];
                  var r = 0;
                  
                  for(var perC = 0; perC < config.setPerInterval; perC++){
                      
                    r = Math.floor((Math.random() * players) + 0);
                    
                    if(typeof ids[r] != 'undefined'){
                        
                        var givCommand = [];
                        givCommand.length = 0;
                        givCommand[1] = ids[r];
                        givCommand[2] = config.minionGiveAmount;
                        givCommand[3] = "GiveMeMinions";
                        
                        setTimeout(function(){
                            
                            gameServer.consoleService.execCommand("minion", givCommand);
                            
                        }, 1000);

                        last.push(ids[r]);

                        ids.length = 0;
                        tlast.push(ids[r]);
                        
                    }
                      
                  }
                      
              }else{

                  // IDLE, Runs when there's no active players.

              }

            }, 2000);
              
          }

      }, config.switchIntervalTime + 2000);
      
  };
  
  setInterval(function(){
      
      if(gameServer.running === true){
          
          if(typeof this.start == 'undefined'){
              
              goooo();
              console.log("Started Minions");
              this.start = false;
              
              
          }
          
      }
      
  }, 1000);
    
};


module.exports = this;
