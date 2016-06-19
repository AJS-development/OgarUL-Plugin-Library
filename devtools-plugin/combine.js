var fs = require('fs');
module.exports = function(gameServer,split) {
var fileone = fs.readFileSync('./console.txt',"utf8");
var filetwo = fs.readFileSync('./translate.txt',"utf8");
var one = fileone.split("\n");
var two = filetwo.split("\n");
var result = "";
for (var i in one) {
 var on = one[i];
  var tw = two[i];
  var s = "this." +  + on +
}
};
