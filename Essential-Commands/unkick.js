
module.exports = function (gameServer, split) {
 var id = parseInt(split[1]);
  if (isNaN(id)) {
    console.log("[Console] Please specify a valid player ID!");
    return;
  }

  for (var i in gameServer.clients) {
    if (gameServer.clients[i].playerTracker.pID == id) {
      var client = gameServer.clients[i].playerTracker;
      if (client.socket.remoteAddress) {
        client.nospawn = false;
      } else {
        console.log("[Console] That player is a bot, cannot unkick");
        return;
      }
      console.log("[Console] Unkicked " + client.name);
      return;
    }
  }
  
  console.log("[Console] Please specify a valid ID!");
  
  }
