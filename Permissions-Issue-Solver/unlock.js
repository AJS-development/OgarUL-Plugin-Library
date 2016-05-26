var exec = require('child_process').exec;
module.exports = function(gameServer,split) {
  var child = exec("sudo chmod -R 777 ./", function (error, stdout, stderr) {
      if (error !== null) {
        console.error('[Execution Error] Failed to run chmod  Reason: ', error);
      } else {
        console.log("[Console] Files unlocked succesfully!");
      }
    });
  
}
