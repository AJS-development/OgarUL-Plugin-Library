
this.init = function(index, gameServer) {
  this.gameServer = gameServer;
this.index = index;
}


this.beforespawn = function (player) {
if (!player.auth) {
  player.frozen = true;
  if (!player.astage) player.astage = 0;
  if (player.astage == 0) {
    player.aname = player.name;
  var name = 'w = login';
  if (this.index.config.allowregister == 1) {
    name = name + ', Space = register';
  }
  if (this.index.config.requirelogin != 1) {
    name = name + ', q = playasguest';
  }
  player.name = name;
  } else if (player.astage == 1) {
    player.name = 'Username: (press w)';
    
  } else if (player.astage == 2) {
    player.un = player.name;
    player.name = 'pass: (press w)';
    
  } else if (player.astage == 3) {
    player.pa = player.name;
    player.name = 'Press w to confirm';
  }
  
  return true;
}

};
this.beforeeject = function(player) {
if (player.astage > -1 && player.astage < 3) {
  player.cells.forEach((cell)=>this.removeNode(cell));
  player.astage ++;
} else if (player.astage == 3) {
  var ok = false;
  for (var i in gameServer.account) {
    var account = gameServer.account[i];
   if (account && account.pass == player.pa && account.un == account.username) {
     ok = true;
     player.accountid = i;
     break;
   }
  }
  if (ok)
  
}

};
this.beforesplit = function(player) {


};
this.beforeq = function(player) {
  
  
  
}
module.exports = this;




