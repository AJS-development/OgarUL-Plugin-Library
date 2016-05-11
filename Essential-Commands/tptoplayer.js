module.exports = function (gameServer, split) {
var fillChar = function (data, char, fieldLength, rTL) {
  var result = data.toString();
  if (rTL === true) {
    for (var i = result.length; i < fieldLength; i++)
      result = char.concat(result);
  } else {
    for (var i = result.length; i < fieldLength; i++)
      result = result.concat(char);
  }
  return result;
};
  var id = parseInt(split[1]);
  var idt = parseInt(split[2]);
  if (isNaN(id)) {
    console.log("[Console] Please specify a valid player ID!");
    return;
  }
  if (isNaN(idt)) {
    console.log("[Console] Please specify a valid target player ID!");
    return;
  }
  var pos;
  var ok = false;
  var target;
  for (var i in gameServer.clients) {
    if (gameServer.clients[i].playerTracker.pID == idt) {
      var client = gameServer.clients[i].playerTracker;

      for (var j in client.cells) {
        client.cells[j].mass = 1000;
        var x = fillChar(client.centerPos.x >> 0, ' ', 5, true);
        var y = fillChar(client.centerPos.y >> 0, ' ', 5, true);

        pos = {
          x: x,
          y: y
        };
      }
      ok = true;
      target = client;
      break;
    }
  }
  if (!ok) {
    console.log("[Console] Invalid Player!");
    return;
  }
  // Make sure the input values are numbers
  if (isNaN(pos.x) || isNaN(pos.y)) {
    console.log("[Console] Invalid coordinates");
    return;
  }

  // Spawn
  for (var i in gameServer.clients) {
    if (gameServer.clients[i].playerTracker.pID == id) {
      var client = gameServer.clients[i].playerTracker;
      for (var j in client.cells) {
        client.cells[j].position.x = pos.x;
        client.cells[j].position.y = pos.y;
      }

      console.log("[Console] Teleported " + client.name + " to " + target.name);
      break;
    }
  }
};
