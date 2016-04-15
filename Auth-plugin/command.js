module.exports = function(gameServer, split) {
  var c = split[1];
if (c == 'power') {
 if (gameServer.auon == 1) {
   gameServer.auon = 0;
   console.log("[Console] Turned off plugin");
   
 } else {
   gameServer.auon = 1;
   console.log("[Console] Turned on plugin");
 }
  
}
if (gameServer.auon != 1) {
  console.log("[Console] Turn on the plugin first")
  return;
} 
if (c == 'record') {
  fs.writeFileSync('accounts.json',JSON.stringify(gameServer.account, null, 2));
  console.log("[Console] Recorded accounts");
}


}
