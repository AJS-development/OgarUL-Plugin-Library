'use strict';
module.exports = class Live {
    constructor(gameServer, config, version) {
        this.gameServer = gameServer;
        this.config = config;
        this.version = version;
        this.run;
        this.lastcall = false;
        this.data = {
            uid: gameServer.uid,
            cDomain: config.customDomain,
            host: "",
            serverName: config.serverName,
            recentPlayer: "",
            settings: {
                serverPort: gameServer.config.serverPort,
                statPort: gameServer.config.serverStatsPort,
                players: 0, // done
                bots: 0, // done
                nodev: process.versions.node,
                version: gameServer.pluginLoader.version,
                key: ""
            },
            uptime: process.uptime(),
            plugins: [] // is not used until in later version.
        };
        for (var i in this.gameServer.pluginLoader.plugins) {
            this.data.plugins.push(i)
        }
        console.log("[Statistics] " + this.data.plugins.length + " Plugins was found");
        this.checkUpdates();
    }
    checkUpdates() {
        require('request').post({
            url: "http://live.ogarul.io",
            method: "POST",
            form: {
                data: "stats",
                type: "version",
                message: "null"
            }
        }, (e, r, b) => {
            if (!e) {
                if (r.statusCode == 200) {
                    if (this.version != b) {
                        console.log("[Statistics] An update has been found! Updating now..");
						this.gameServer.consoleService.execCommand("plugin", ["plugin", "update", "Statistics"]);
						console.log("Restarting...");
						setTimeout(()=>{
							this.gameServer.consoleService.execCommand("restart", ["restart"]);
						}, 4e3);
                        return;
                    }
                    this.checkKey();
                    return;
                }
            } else {
                console.log("[Statistics] Could not check for updates!");
                this.checkKey();
                return;
            }
        });
    }

    checkKey() {
        // check serverName before sending data
        if (!this.config.serverName) {
            console.log("[Statistics] A valid serverName is needed to finalize statistics!.");
            return;
        }
        // check key
        if (true) { // if(this.config.key == "{randomKey}"){
            console.log("[Statistics] Checking Key..");
            var key = "";
            var config = "";

            require('fs').readFile(__dirname + "/config.ini", (e, r, b) => {
                if (!e) {
                    config = r.toString('utf-8');
                    require('request').post({
                        url: "http://live.ogarul.io",
                        method: "POST",
                        form: {
                            data: "stats",
                            type: "register",
                            message: this.gameServer.uid
                        }
                    }, (x, m, j) => {
                        var data;
                        if (!x) {
                            data = JSON.parse(j);
                            if (!data.hash) {
                                console.log("[Statistics] Could not get responce");
                                return;
                            }
                            if (this.config.key == "{randomKey}") {
                                console.log("[Statistics] Generating key...");
                                //config = config.replace(/{randomKey}/g, j);
                                //require('fs').writeFile(__dirname + "/config.ini", config);
                                if (!this.updateKey(data.hash)) {
                                    console.log("Could not update config key!.");
                                    return;
                                }
                                console.log("[Statistics] a restart is needed to take effect!");
                                return;
                            } else {
                                if (!isNaN(data.status)) {
                                    if (parseInt(data.status) == 1) {
                                        console.log("[Statistics] Recreating server stats..");
                                        if (data.hash != this.config.key) {
                                            if (!this.updateKey(data.hash)) {
                                                console.log("[Statistics] Could not update config key!.");
                                                return;
                                            }
                                            console.log("[Statistics] a restart is needed to take effect!");
                                            return;
                                        }
                                        this.setup();
                                        return;
                                    } else if (parseInt(data.status) == 0) {
                                        if (data.hash == this.config.key) {
                                            this.setup();
                                            return;
                                        } else {
                                            if (!this.updateKey(data.hash)) {
                                                console.log("[Statistics] Could not update config key!.");
                                                return;
                                            }
                                            console.log("[Statistics] a restart is needed to take effect!");
                                            return;
                                        }
                                    }
                                } else {
                                    if (data.hash != this.config.key) {
                                        this.setup();
                                        return;
                                    }
                                    console.log("[Statistics] updating key");
                                    if (!this.updateKey(data.hash)) {
                                        console.log("[Statistics] Could not update config key!.");
                                        return;
                                    }
                                    console.log("[Statistics] a restart is needed to take effect!");
                                    return;
                                }
                            }
                        } else {
                            console.log("[Statistics] Could not get key");
                            return;
                        }
                    })
                } else {
                    console.log(e);
                    return;
                }
            });
        }
    }
    updateKey(key) {
        console.log("[Statistics] Updating config key..");
        try {
            require('fs').readFile(__dirname + "/config.ini", (e, b) => {
                if (!e) {
                    let domain = typeof (this.config.cDomain) != "undefined" ? this.config.cDomain : "";
                    require('fs').writeFile(__dirname + "/config.ini", '// This key is your private key!. Do not share, and do not touch ! \r\nkey = "' + key + '" ' + "\r\n" + '// serverName is your unique display name for your server \r\nserverName = "' + this.config.serverName + '"' + "\r\n" + '// cDomain is your custom domain. You can use this if you have one \r\ncDomain = "' + domain.toString().replace("NaN", "") + '"');
                    return true;
                } else {
                    return false;
                }
            });
            return true;
        } catch (e) {
            return false;
        }
    }
    setup() {
        // valid key
        this.data.settings.key = this.config.key;
        console.log("[Statistics] Key has been registered & validated ");

        // get host information
        require('request').post({
            url: "http://live.ogarul.io",
            method: "POST",
            form: {
                data: "gethost"
            }
        }, (e, r, b) => {
            if (!e) {
                let l = JSON.parse(b);
                this.data.host = l.ip;
                console.log("[Statistics] host information has been obtained, and secured!.");
                // check for custom domain...
                if (this.config.cDomain.length > 0) {
                    this.data.cDomain = this.config.cDomain;
                    console.log("[Statistics] Custom domain is active");
                }
                // update
                this.run = setInterval(() => {
                    this.update();
                }, 6e4)
                this.update();
            } else {
                console.log("[Statistics] failed to get host information. This could be due to no internet connectivity, or ogarul.io services are down. Try again later.");
                return;
            }
        });
    }
    recentPlayer(player) {
        this.data.recentPlayer = player;
        return;
    }
    getGameData() {
        let players = 0;
        let bots = 0;
        for (var i in this.gameServer.clients) {
            let o = this.gameServer.clients[i];
            if (typeof (o.remoteAddress) != 'undefined') {
                players++;
            } else {
                bots++;
            }
        }
        return {
            players,
            bots
        };
    }
    update() {
        if (!this.lastcall) {
            console.log("[Statistics] Updating data ");
        }
        let settings = this.getGameData();
        this.data.settings.players = settings.players;
        this.data.settings.bots = settings.bots;
        this.data.uptime = process.uptime();
        setTimeout(() => {
            require('request').post({
                url: "http://live.ogarul.io",
                method: "POST",
                form: {
                    data: "stats",
                    type: "update",
                    message: JSON.stringify(this.data)
                }
            }, (e, r, b) => {
                if (!e) {
                    let responce = JSON.parse(b);
                    if (r.statusCode == 200) {
                        if (responce.status = 1) {
                            if (!this.lastcall) {
                                console.log("Data sucessfully updated!, no more messages will be seen after this.");
                                this.lastcall = true;
                            }
                        } else if (responce.status = 0) {
                            console.log("[Statistics] Could not update");
                        } else {
                            console.log("[Statistics] There was an error while updating!.")
                        }
                    } else {
                        console.log("[Statistics] Bad responce");
                    }
                } else {
                    console.log("[Statistics] Could not update!");
                }
            });
        }, 2e3);
    }

}
