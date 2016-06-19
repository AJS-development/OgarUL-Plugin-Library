var fs = require('fs');
module.exports = function(gameServer,split) {
var fileone = fs.readFileSync('./console.txt',"utf8");
var filetwo = fs.readFileSync('./translate.txt',"utf8");
var one = fileone.split("\n");
var two = filetwo.split("\n");
var result = "this.lang = [];\n";
for (var i in one) {
 var on = one[i];
  var tw = two[i];
  var s =  "this.lang[" + i + "] = { original:" + on + ",replaceto:" + tw + "};\n"
  result = result + s;
}
result = result + "module.exports = this;";
fs.writeFileSync("result.js",result);
};
