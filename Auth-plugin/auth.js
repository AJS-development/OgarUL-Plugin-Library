
this.init = function(index, gameServer) {
  this.gameServer = gameServer;
this.index = index;
this.default = 0;
if (this.index.config.allowregister != 1 && this.index.config.requirelogin != 1 && this.index.config.reservename != 1) this.default = 1;
if (this.index.config.hidelogin == 1 && this.index.config.reservename != 1) this.default = 60;
};


this.beforespawn = function (player,gameServer) {
  if (!player.socket.remoteAddress) {
     player.astage = 100;
          player.guest = true;
          player.frozen = false;
          player.auth = true;
          try {
    clearTimeout(player.kt);
  } catch (e) {
    
  }
          return true;
  }
  
  
  try {
    clearTimeout(player.kt);
  } catch (e) {
    
  }
  if (player.name == player.olname && gameServer.auon == 1) {
    player.name = player.un;
  }
if ((!player.auth || (this.index.config.reservename == 1 && player.name != player.un)) && gameServer.auon == 1) {
  if (this.index.config.kicktime > 0) {
  player.kt = setTimeout(function() {
    player.socket.close();
    
  }.bind(this), this.index.config.kicktime * 1000);
  };
  player.frozen = true;
  if (this.index.config.reservename == 1 && player.name != player.un && player.astage == 100) player.astage = this.default;
  if (isNaN(player.astage)) player.astage = this.default;
  if (player.astage == 60) {
    player.auth = true;
    player.guest = true;
    player.frozen = false;
    try {
    clearTimeout(player.kt);
  } catch (e) {
    
  }
  return true;
  
  } else if (player.astage == 0) {
    if (this.index.config.reservename == 1) {
      var ok = true;
      for (var i in gameServer.account) {
        var account = gameServer.account[i];
        if (account.username == player.name) {
          ok = false;
          player.mupa = account.pass;
          break;
        }
      }
      if (ok) {
        if (this.index.config.allowregister == 1) {
          player.un = player.name;
          player.aname = player.name;
        player.name = 'Account Unregistered, press w to register it!';
        if (this.index.config.requirelogin != 1) player.name = player.name + ', Press q to play as guest';
        player.astage = 99;
        } else {
          player.astage = 100;
          player.guest = true;
          player.frozen = false;
          player.auth = true;
          try {
    clearTimeout(player.kt);
  } catch (e) {
    
  }
          return true;
        }
      } else {
       player.un = player.name;
       player.name = 'Account registered, Press w to login or use another name';
       player.astage = 30;
      }
      
      
    } else {
    
    player.aname = player.name;
  var name = 'w = login';
  if (this.index.config.allowregister == 1) {
    name = name + ', Space = register';
  }
  if (this.index.config.requirelogin != 1) {
    name = name + ', q = playasguest';
  }
  player.name = name;
    }
  } else if (player.astage == 97) {
    player.olname = player.name;
    player.pas = player.name;
    player.name = 'Press w to confirm';
  } else if (player.astage == 32) {
    player.olname = player.name;
    player.pas = player.name;
    player.name = 'Press w to confirm';
  } else if (player.astage == 1) {
    player.name = 'Login, Username: (press w)';
    
  } else if (player.astage == 2) {
    player.un = player.name;
    player.name = 'pass: (press w)';
    
  } else if (player.astage == 3) {
    player.olname = player.name;
    player.pa = player.name;
    player.name = 'Press w to confirm';
  } else if (player.astage == 5) {
    player.name = 'Username (press w)';
  
  
    
  } else if (player.astage == 6) {
    var ok = true;
    for (var i in gameServer.account) {
      if (gameServer.account[i].username == player.name) {
        ok = false;
        break;
      }
      
    }
    if (ok) {
    player.un = player.name;
    player.name = 'Pass: (pres w)';
    player.astage = 7;
    } else {
      player.name = 'Username taken (press w)';
      player.astage = 50;
    }
    
  } else if (player.astage == 32) {
    player.name = 'press w to confirm';
  } else if (player.astage == 8) {
    player.pass = player.name;
    player.astage = 9;
    var ac = {
      username: player.un,
      pass: player.pass,
      
    };
    gameServer.onregister(player);
    var re = gameServer.extraregpar;
    for (var i in re) ac[i] = re[i];
    gameServer.account.push(ac);
    
    player.name = 'Success!, Press w to login';
    player.astage = 50;
  }
  
  return true;
}

return true;

};
this.beforeeject = function(player, gameServer) {
  if (player.cells && player.cells.length > 0 && gameServer.auon == 1) {
  if (player.astage == 0) {
    
  player.name = 'Username: (press w)';
  player.astage = 1;
  return false;
 } else if (player.astage > 0 && player.astage < 3) {
  player.cells.forEach((cell)=>gameServer.removeNode(cell));
  player.astage ++;
  return false;
   
 } else if (player.astage == 30) {
   player.name = 'Pass: (press w)';
   player.astage = 31;
   return false;
 } else if (player.astage == 31) {
   player.cells.forEach((cell)=>gameServer.removeNode(cell));
   player.astage = 32;
   return false;
 } else if (player.astage == 33) {
   player.frozen = false;
   player.name = player.un;
   player.astage = 100;
    try {
    clearTimeout(player.kt);
  } catch (e) {
    
  }
   gameServer.afterauth(player);
   return false;
 } else if (player.astage == 32) {
   var ok = false;
   for (var i in gameServer.account) {
     if (gameServer.account[i].username == player.un && gameServer.account[i].pass == player.pas) {
       ok = true;
       player.accountid = i;
       player.auth = true;
       player.astage = 33;
       try {
    clearTimeout(player.kt);
  } catch (e) {
    
  }
       player.guest = false;
       player.name = 'success! press w';
     }
     
   } 
   if (!ok) {
     player.name = 'login fail, press w';
     player.astage = 50;
   }
   return false;
 } else if (player.astage == 99) {
  player.name = 'Password: (pressw)';
  player.astage = 98;
  return false;
 } else if (player.astage == 98) {
   player.cells.forEach((cell)=>gameServer.removeNode(cell));
   player.astage = 97;
   return false;
 } else if (player.astage == 97) { 
   var p = {
     username: player.un,
     pass: player.pas,
   };
    gameServer.onregister(player);
    var re = gameServer.extraregpar;
    for (var i in re) p[i] = re[i];
   gameServer.account.push(p);
   player.name = 'Success! Press w to log in';
   player.astage = 50;
   return false;
 } else if (player.astage == 95) {  
   player.name = 'Pass: (pressw)';
   player.astage = 30;
   return false;
} else if (player.astage == 3) {
  var ok = false;
  for (var i in gameServer.account) {
    var account = gameServer.account[i];
   if (account && account.pass == player.pa && player.un == account.username) {
     ok = true;
     player.accountid = i;
     break;
   }
  }
  if (!ok) {
    player.name = 'Wrong pass or username , press w';
    player.astage = 50;
  } else {
    player.name = 'Success, press w';
    player.astage = 4;
    player.guest = false;
    player.auth = true;
    try {
    clearTimeout(player.kt);
  } catch (e) {
    
  }
  }
  return false;
} else if (player.astage == 4) {
  player.frozen = false;
  player.name = player.aname;
  player.astage = 100;
   try {
    clearTimeout(player.kt);
  } catch (e) {
    
  }
  gameServer.afterauth(player);
  return false;
} else if (player.astage == 5) {
player.cells.forEach((cell)=>gameServer.removeNode(cell));
player.astage = 6;
} else if (player.astage == 50) {
  player.cells.forEach((cell)=>gameServer.removeNode(cell));
  player.astage = this.default;
} else if (player.astage == 7) {
  player.cells.forEach((cell)=>gameServer.removeNode(cell));
  player.astage = 8;
  } else {
  return true;
}
}
return false;

};
this.beforesplit = function(player,gameServer) {
   if (player.cells && player.cells.length > 0 && gameServer.auon == 1) {
if (player.astage == 0 && this.index.config.allowregister == 1) {
  player.name = 'Username: (press w)';
  player.astage = 5;
} else {
  return true;
}
}
return false;
};
this.beforeq = function(player, gameServer) {
   if (player.cells && player.cells.length > 0 && gameServer.auon == 1 && (!player.auth || (player.astage == 60 && player.guest))) {
   if (player.astage == 60) {
    player.cells.forEach((cell)=>gameServer.removeNode(cell));
    player.astage = 0;
    player.auth = false;
     
} else if ((player.astage == 0 || player.astage == 99) && this.index.config.requirelogin != 1) {
    player.frozen = false;
    player.name = player.aname;
    player.astage = 100;
    player.auth = true;
    player.guest = true;
    try {
    clearTimeout(player.kt);
  } catch (e) {
    
  }
  } else if (player.astage > 0 && player.astage < 100) {
    player.cells.forEach((cell)=>gameServer.removeNode(cell));
  player.astage = this.default;
    
  } 
  return false;
   } else {
     return true;
   }
};
module.exports = this;


