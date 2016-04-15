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

}
