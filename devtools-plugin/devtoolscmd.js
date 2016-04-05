'use strict';

module.exports = function (gameServer, args) {
  switch (args[1]) {
    case 'hashFiles':
      gameServer.updater.hashFiles();
      console.log("[Console] Running hashfiles")
      break;
    case 'devMode':
      if ( gameServer.config.dev == 1) {
              gameServer.config.dev = 0;
              console.log("[Console] Turned off devmode");
        
      } else {
      gameServer.config.dev = 1;
      console.log("[Console] Turned on devmode");
      }
      break;
     case 'compileFilesJson':
       console.log("[Console] Compiling files.json...");
       
       var fs = require('fs');
var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};
walk(../../../src,function(err, results) {
  if (err) throw err;
  console.log(results);
});

       
       break;
    default:
      console.log('Unknown command, do hashFiles, devMode, or compileFilesJson');
  }
};
