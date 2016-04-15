
this.init = function(index, gameServer) {
  this.gameServer = gameServer;
this.index = index;
}


this.beforespawn = function (player) {
if (!player.auth) {
  player.frozen = true;
  var name = 'w = login';
  if (this.index.config.allowregister == 1) {
    name = name + ', Space = register';
  }
  if (this.index.config.allowregister == 1) {
    name = name + ', Space = register';
  }
  
  
}

};
this.beforeeject = function(player) {


};
this.beforesplit = function(player) {


};
this.beforeq = function(player) {
  
  
  
}
module.exports = this;




