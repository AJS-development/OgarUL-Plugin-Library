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
    
    return;
  }
  if (!gameServer.LBSP) {
    console.log("[Console] Please enable plugin again by doing customLB power to access other commands!");
    return;
  }
  
  if (c == "stats") {
     if (gameServer.LBSPS) {
      gameServer.LBSPS = false;
      console.log("[Console] Turned off LB stats");
    } else {
        gameServer.LBSPS = true;
      console.log("[Console] Turned on LB stats");
      
    }
    
  } else if (c == "custom") {
    var dur = parseInt(split[2])
    if (isNaN(dur)) {
      console.log("[Console] Please specify a duration in seconds");
      return;
    }
    
    var newLB = [];
  for (var i = 3; i < split.length; i++) {
    newLB[i - 3] = split[i];
  }
  
  gameServer.extraLBCustom = newLB;
  gameServer.eLBCDuration = dur;
    console.log("[Console] Set your text in the bottom of the leaderboard for " + dur);
  } else {
    console.log("[Console] Please speficy a command, power, stats, or custom");
  }
  
  
}
