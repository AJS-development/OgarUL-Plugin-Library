Ok ok ok, **Note: It can be a game temporary fix now, having 2 configs for bots and players _'wink'_**

> You want a custom player start mass? But bots are spawning as the start mass, or higher and not less?

I've made this plugin to fix your issues. Here's how to use
* in ./settings/config.ini change playerStartMass to 1. 

> (**Now used as bot mass**)(**Use SuperMinions to override**)

<details><summary>Code Source v1.0.0</summary><a href="http://dev.ogarul.tk/data/public/0c3cc3" target="_blank">Source</a></details>
<details><summary>Code Source v1.0.1 (Patch0.2)</summary><a href="http://dev.ogarul.tk/data/public/491b71" target="_blank">Source</a></details>

#### Download this plugin
<details><summary>MassStart 1.0.1(Patch0.2)</summary><a href="http://dev.ogarul.tk/data/public/369b1c" target="_blank">Download</a></details>
<details><summary>MassStart 1.0.0</summary><a href="http://dev.ogarul.tk/data/public/a7ac4f" target="_blank">Download</a></details>

###### Contact
> Report any given bugs here, or contact me [here](mailto:support@legitsoulja.info)

## Development [Builds](http://dev.ogarul.tk/data/public/607ffa)

###### v1.0.1 Development
* [x] Few bugs fixes.
* [x] Create log system for mass. 
* [x] Remove all plugin lag.
* [x] Better log handler.
* [x] Better MassList display.
* [x] Better, working efficient layout.
* [x] Working on languages, for of my plugins.
* [x] Add more color, for the beauty, and intensity.
* [x] Rescope and retouch the layout.
* [x] Make tests..

#### Change MassStart Configuration
* in ./plugins/MinionStart/config.ini change playerStartMass to your player(s) start mass.

###### Configurations...
* ```playerStartMass```

> The mass your player's will receive in game. (**IP MassStart may be added in the future**).

* ```notificiation```

> The player will receive an in-game message about there **mass** changes.

##### v1.0.1 Additions
* ```masslist```

> Enable, and disable Mass List usage

* ```ipperplay```

> How many players per IP can join at once.

* ```debug```

> Output some information. Used for debugging.

* ```output``` (Deprecated)

> For those people who don't want nothing showed in the console at all. (Deprecated)


#### Now what?
Now, you are able to have bots in your game less size than players. Any size you are willing to spawn in-game you can. SuperMinions will come handy. **Bots size will spawn with 1 mass** (which you have added) unless there size is declared with SuperMinions, or changed in default(config) just for bots..

When players spawn in the game, there mass thats provided in MassStart config, will be given to only **Players** on join, (**Not bots**).

#### MinionStart Commands
* ms [add,set,rem] [id] [mass]

> You are allowed to add, set, or remove certain amount of mass from players.

#### MinionStart Commands v1.0.1 Features
* msl [add,rem] [add(id,ip), rem(id,ip,all)] [mass(add,rem)]
* msl reload (Reloads log)


###### That's all folks. This is a very handy, useful plugin.
