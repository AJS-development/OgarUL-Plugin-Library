'use strict';   // dont touch
this.command = []; // dont touch
this.commandName = []; // dont touch
this.gamemodeId = []; // dont touch
this.gamemode = []; // dont touch
this.addToHelp = []; // dont touch

// [General]
this.name = "ShortCuts"; // Name of plugin REQUIRED
this.author = "DavidAli&LegitSoulja"; // author REQUIRED
this.description = 'Shortcuts'; // Desciprtion
this.compatVersion = ''; // compatable with (optional)
this.version = '1.0.0'; // version REQUIRED

this.addToHelp[1] = "shortcuts     : Main shortcuts command."
this.addToHelp[1] = "m     : short minion command replacement";
this.addToHelp[2] = "t     : short troll command replacement";
this.addToHelp[3] = "f     : short freeze command replacement";
this.addToHelp[4] = "ab    : short addbot command replacement";
this.addToHelp[5] = "kb    : short kickbots command replacement";
this.addToHelp[6] = "b    : short board command replacement";
this.addToHelp[7] = "rs    : short restart command replacement";
this.addToHelp[8] = "sp    : short spwanmass command replacement";
this.addToHelp[9] = "cb    : short chatban command replacement";
this.addToHelp[10] = "k    : short kill command replacement";
this.addToHelp[11] = "ka    : short killall command replacement";
this.addToHelp[12] = "ms    : short mass command replacement";
this.addToHelp[13] ="pl    : short playerlist   command replacement";
this.addToHelp[14] = "s     : short speed command replacement";
this.addToHelp[15] = "c     : short chat command replacement";
this.addToHelp[16] = "up    : short update command replacement";
this.addToHelp[17] = "kr    : short killrange command replacement";
this.addToHelp[18] = "p     : short pause command replacement";
this.addToHelp[19] = "mg    : short merge command replacement";

this.commandName[1] = "shortcuts";
this.commandName[2] = "m"; // m = minion command..
this.commandName[3]="t"; // t = troll command
this.commandName[4]="f"; //f= freeze command
this.commandName[5]="ab"; // ab = addbot command
this.commandName[6]="kb"; // kb = kickbots command
this.commandName[7]="b"; // b= board
this.commandName[8]="rs"; // rs = restart
this.commandName[9]="sp"; // ps= spawnmass
this.commandName[10]="cb"; // cb=Chatban
this.commandName[11]="k"; // k =kill 
this.commandName[12]="ka"; // ka = killall
this.commandName[13]="ms"; // ms = mass 
this.commandName[14]="pl"; // pl= playerlist my favor XD
this.commandName[15]="s"; // s= speed
this.commandName[16]="c"; // c=Chat
this.commandName[17]="up"; // up= Update
this.commandName[18]="kr"; // kr= killrange
this.commandName[19]="p"; // p= pause 
this.commandName[20]="mg"; // mg = Merge

this.command[1] = function(gameServer, split){
    say.cyan("m     : short minion command replacement");
    say.cyan("t     : short troll command replacement");
    say.cyan("f     : short freeze command replacement");
    say.cyan("ab    : short addbot command replacement");
    say.cyan("kb    : short kickbots command replacement");
    say.cyan("b     : short board command replacement");
    say.cyan("rs    : short restart command replacement");
    say.cyan("sp    : short spawnmass command replacement");
    say.cyan("cb    : short chatban command replacement");
    say.cyan("k     : short kill command replacement");
    say.cyan("ka    : short killall command replacement");
    say.cyan("ms    : short mass command replacement");
    say.cyan("pl     : short playerlist command replacement");
    say.cyan("s     : short speed command replacement");
    say.cyan("c     : short chat command replacement");
    say.cyan("up    : short update command replacement");
    say.cyan("kr    : short killrange command replacement");
    say.cyan("p     : short pause command replacement");
    say.cyan("mg    : short merge command replacement");
    return true;
}
this.command[2] = function(gameServer, split){
    var mn = pconfig.minionName.split(',');
    var ran = Math.floor((Math.random() * mn.length) + 0);
    split[0] = "";
    if(split[3] == "" || split[3] == " " || !split[3]){
        split[3] = mn[ran];
    }
    gameServer.consoleService.execcommand("minion", split);
    return true;
}
//here
this.command[3] = function(gameServer, split){
    split[0] = "";
    gameServer.consoleService.execcommand("troll", split);
    return true; // done ok
}
this.command[4] = function(gameServer,split){
    split[0] = "";
    gameServer.consoleService.execcommand("freeze",split);
    return true; //so ? what about id ? confus
}
this.command[5] = function(gameServer,split){
    split[0] ="";
    gameServer.consoleService.execcommand("addbot",split);
    return true; // done? 
}
this.command[6] = function(gameServer,split){
    split[0] = "";
    gameServer.consoleService.execcommand("kickbots",split);
    return true;
}
this.command[7] = function(gameServer,split){
    split[0]="";
    gameServer.consoleService.execcommand("board",split);
    return true;
}
this.command[8] =function(gameServer,split){
    split[0]="";
    gameServer.consoleService.execcommand("restart",split);
    return true;
}
this.command[9] =function(gameServer,split){
    split[0]="";
    gameServer.consoleService.execcommand("spawnmass",split);
    return true;
}
this.command[10] =function(gameServer,split){
    split[0]="";
    gameServer.consoleService.execcommand("chatban",split);
    return true;
}
this.command[11] =function(gameServer,split){
    split[0]="";
    gameServer.consoleService.execcommand("kill",split);
    return true;
}
this.command[12] =function(gameServer,split){
    split[0]="";
    gameServer.consoleService.execcommand("killall",split);
    return true;
}
this.command[13] =function(gameServer,split){
    split[0]="";
    gameServer.consoleService.execcommand("mass",split);
    return true;
}
this.command[14] =function(gameServer,split){
    split[0]="";
    gameServer.consoleService.execcommand("playerlist",split);
    return true;
}
this.command[15] =function(gameServer,split){
    split[0]="";
    gameServer.consoleService.execcommand("speed",split);
    return true;
}
this.command[16] =function(gameServer,split){
    split[0]="";
    gameServer.consoleService.execcommand("chat",split);
    return true;
}
this.command[17] =function(gameServer,split){
    split[0]="";
    gameServer.consoleService.execcommand("update",split);
    return true;
}
this.command[18] =function(gameServer,split){
    split[0]="";
    gameServer.consoleService.execcommand("killrange ",split);
    return true;
}
this.command[19] =function(gameServer,split){
    split[0]="";
    gameServer.consoleService.execcommand("pause",split);
    return true;
}
this.command[20] =function(gameServer,split){
    split[0]="";
    gameServer.consoleService.execcommand("merge",split);
    return true;
}

// [Configuration]
this.config = {

    minionName: "",
    
};
this.configfile = "config.ini";

var pconfig = {
    minionName: "",
}

// INSERT PLUGIN BELOW

// [Functions]
this.init = function (gameServer, config) {
    this.gameServer = gameServer;
    this.config = config;
    
    pconfig.minionName = config.minionName;
    setTimeout(function(){
        console.log("m=minion ,, t= troll ,, f=freeze ,, ab=addbot ,, kb=kickbots ,, b= board ,,");
        console.log("rs=restart ,, sp=spwanmass ,, cb=chatban ,, k=kill ,, ka=killall ,, ms=mass ,,");
        console.log("pl=playerlist ,, s=speed ,, c=chat ,, up=update ,, kr=killrange ,, p=pause ,, mg=merge ,,");
    }, 1000*5); // 5 seconds wait till print
};

var say = {
  head: "Shortcuts",
  red: function(log) {
    console.log("[" + "\x1b[31m" + this.head + "\x1b[0m" + "] " + log);
    return;
  },
  green: function(log) {
    console.log("[" + "\x1b[32m" + this.head + "\x1b[0m" + "] " + log);
    return;
  },
  cyan: function(log) {
    console.log("[" + "\x1b[36m" + this.head + "\x1b[0m" + "] " + log);
    return;
  },
  cmd: function(log) {
    console.log("\x1b[30m" + "[" + "\x1b[32m\x1b[5m" + this.head + "\x1b[30m" + "]" + "\x1b[0m" + log);
    return;
  },
  def: function(log) {
    console.log("\x1b[32m" + "[" + "\x1b[37m" + this.head + "\x1b[32m" + "]" + "\x1b[0m " + log);
    return;
  }
};

module.exports = this; // dont touch
