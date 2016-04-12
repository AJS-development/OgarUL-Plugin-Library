module.exports = function(gameServer,split) {
  var c = split[1];
  if (c == "power") {
    if (gameServer.LBSP) {
      gameServer.LBSP = false;
      console.log("[Console] Turned off the LB stats plugin");
    } else {
        gameServer.LBSP = true;
      console.log("[Console] Turned on the LB stats plugin");
      
    }
    
    
  } else if (c == "stats") {
     if (gameServer.LBSPS) {
      gameServer.LBSPS = false;
      console.log("[Console] Turned off LB stats");
    } else {
        gameServer.LBSPS = true;
      console.log("[Console] Turned on LB stats");
      
    }
    
  } else if (c == "custom") {
    
    
  } else {
    console.log("[Console] Please speficy a command, power, stats, or custom");
  }
  
  
}
