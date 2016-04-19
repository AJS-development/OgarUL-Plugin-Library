const fs = require('fs');
module.exports = function(gameServer, split) {
  var c = split[1];
if (c == 'power') {
 if (gameServer.auon == 1) {
   gameServer.auon = 0;
   console.log("[Console] Turned off plugin");
   return;
 } else {
   gameServer.auon = 1;
   console.log("[Console] Turned on plugin");
   return;
 }
  
}
if (gameServer.auon != 1) {
  console.log("[Console] Turn on the plugin first")
  return;
} 
if (c == 'record') {
  fs.writeFileSync('accounts.json',JSON.stringify(gameServer.account, null, 2));
  console.log("[Console] Recorded accounts");
} else if (c == 'register') {
  if (!split[2]) {
    
    console.log("[Console] Please specify a username")
    return;
  }
  if (!split[3]) {
     console.log("[Console] Please specify a password")
     return;
  }
  var p = {
    username: split[2],
    pass: split[3],
    
  }
  var re = gameServer.extraregpar;
    for (var i in re) p[i] = re[i];
  gameServer.account.push(p);
  console.log("[Console] Registered account");
} else if (c == 'reload') {
gameServer.account = JSON.parse(fs.readFileSync('accounts.json'));  
console.log("[Console] Reloaded accounts");
} else if (c == 'remove') {
  if (!split[2]) {
    
    console.log("[Console] Please specify a username")
    return;
  }
  var acc = 0;
  for (var i in gameServer.account) {
    var account = gameServer.account[i];
    if (account.username == split[2]) {
      acc = account;
      break;
    }
  }
  var index = gameServer.account.indexOf(acc);
    if (index != -1) {
      gameServer.account.splice(index, 1);
      console.log("[Console] Removed " + acc.username);
    } else {
      // todo do we really care?
      console.log("[Console] No such account exsists!");
    }
} else if (c == 'edit') {
  if (!split[2]) {
    
    console.log("[Console] Please specify a username")
    return;
  }
  if (!split[3]) {
    
    console.log("[Console] Please specify a parameter")
    return;
  }
  if (!split[4]) {
    
    console.log("[Console] Please specify the change")
    return;
  }
   for (var i in gameServer.account) {
    if (gameServer.account[i].username == split[2]) {
      var account = gameServer.account[i]
      account[split[3]] = split[4];
      console.log("[Console] Set the " + split[3] + " par to " + split[4]);
      break;
    } 
     
   }
  
} else {
  
  console.log("[Console] Please specify a valid command!, register, remove, edit, power, record, reload");
}



};
