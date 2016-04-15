
this.init = function(index, gameServer) {
  this.gameServer = gameServer;
this.index = index;
}


this.beforespawn = function (player) {
if (!player.auth) {
  if (!player.astage) player.astage = 0;
  if (player.astage == 0) {
    player.frozen = true;
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
  } else if (player.astage == 5) {
    player.name = 'Username (press w)';
    
  } else if (player.astage == 6) {
    ok = true;
    for (var i in gameServer.account) {
      if (gameServer.account[i].username == player.name) {
        ok = false
        break;
      }
      
    }
    if (ok) {
    player.pa = player.name;
    player.name = 'Pass: (pres w)';
    player.astage = 7;
    } else {
      player.name = 'Username taken (press w)';
      player.astage = 50;
    }
    
  } else if (player.astage == 8) {
    player.pass = player.name;
    player.astage = 9;
    var ac = {
      username: player.un,
      pass: player.pass,
      
    };
    gameServer.account.push(ac);
    
    player.name = 'Success!, Press w to login'
    player.astage = 50;
  }
  
  return true;
}
return true;

};
this.beforeeject = function(player) {
if (player.astage > -1 && player.astage < 3) {
  player.cells.forEach((cell)=>this.removeNode(cell));
  player.astage ++;
  return false;
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
  if (!ok) {
    player.name = 'Wrong pass or username , press w';
    player.astage = 50;
  } else {
    player.name = 'Success, press w'
    player.astage = 4;
  }
  return false
} else if (player.astage == 4) {
  player.frozen = false;
  player.name = player.aname;
  player.astage = 100;
  return false
} else if (player.astage == 5) {
player.cells.forEach((cell)=>this.gameServer.removeNode(cell));
player.astage = 6;
} else if (player.astage == 50) {
  player.cells.forEach((cell)=>this.gameServer.removeNode(cell));
  player.astage = 0;
} else if (player.astage == 7) {
  player.cells.forEach((cell)=>this.gameServer.removeNode(cell));
  player.astage = 8;
  } else {
  return true;
}
return false;
};
this.beforesplit = function(player) {
if (player.astage == 0 && this.index.config.allowregister == 1) {
  player.cells.forEach((cell)=>this.gameServer.removeNode(cell));
  player.astage = 5;
} else {
  return true;
}
return false;
};
this.beforeq = function(player) {
  if (player.astage == 0 && this.index.config.requirelogin != 1) {
    player.frozen = false;
    player.name = player.aname;
    player.astage = 50
  } else if (player.astage > 0 && player.astage < 100) {
    player.cells.forEach((cell)=>this.gameServer.removeNode(cell));
  player.astage = 0;
    
  }
  
  
}
module.exports = this;




