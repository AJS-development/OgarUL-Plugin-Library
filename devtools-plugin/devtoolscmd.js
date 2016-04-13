'use strict';
const fs = require('fs');
const crypto = require('crypto');
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
          if (file.indexOf('/plugins/') == -1 && file.indexOf('.txt') == -1 && file.indexOf('override.ini') == -1 && file.indexOf('filesTemp.json') == -1 && file.indexOf('devFiles.json') == -1 && file.indexOf('.log') == -1) {
          results.push(file);
            }
          next();
        }
      });
    })();
  });
};
walk('.',function(err, results) {
  if (err) throw err;
  console.log("[Console] Scanned src...");
  console.log(results);
  var j = 0;
  var jso = [];
  for (var i in results) {
      var r = results[i]
      let ind = r.lastIndexOf("/");
      let myString = r;
      if( myString.charAt( 0 ) === '.' ) myString = myString.slice( 1 );
     
      var current_date = (new Date()).valueOf().toString();
var random = Math.random().toString();
var hash = crypto.createHash('sha1').update(current_date + random).digest('hex');
      var pj = {
      hash: hash,
      src: 'src' + myString.replace(/ /g,"%20"),
      dst: r,
      name: r.slice(ind + 1),
  };
      jso.push(pj);
      
  }
  current_date = (new Date()).valueOf().toString();
random = Math.random().toString();
 hash = crypto.createHash('sha1').update(current_date + random).digest('hex');
    pj = {
      hash: hash,
      src: 'README.md',
      dst: '../README.md',
      name: 'Readme',
  };
      jso.push(pj);
        current_date = (new Date()).valueOf().toString();
 random = Math.random().toString();
 hash = crypto.createHash('sha1').update(current_date + random).digest('hex');
   pj = {
      hash: hash,
      src: 'package.json',
      dst: '../package.json',
      name: 'package.json',
  }
  
  jso.push(pj);
  
  var dat = JSON.stringify(jso, null, 2);
  console.log("[Console] Finished and file is located at devFiles.json");
  fs.writeFileSync('devFiles.json', dat);
});

       
       break;
    default:
      console.log('Unknown command, do hashFiles, devMode, or compileFilesJson');
  }
};
