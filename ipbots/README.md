```
.__      ___.           __          
|__|_____\_ |__   _____/  |_  ______
|  \____ \| __ \ /  _ \   __\/  ___/
|  |  |_> > \_\ (  <_> )  |  \___ \ 
|__|   __/|___  /\____/|__| /____  >
|__|__|       \/                 \/ 
- version 1.0.0 <Created By LegitSoulja>
Notes.. Future references ,
Add timer (limit) for how long a player will have bots for.. [ipbot add [ip or id] [minion amount] [time in minutes]
```
___________________________________________________________________________________________________________________________________________

IPBots
>> Author :: LegitSoulja

>> Plugin :: IPBots

>> License :: I don't really care what you desire to do with this., lets get to how the plugin works.

##### Help options & Commands
* ```(ipbot add [ip || id(in game)] [amount])```

> You will have the ability to give a specific person in a game with minions(bot) access. When you provide a ID the IP from the player(ID) will get grabbed,
and get stored. When a player even logs off or disconnect he can join right back without you having to re-give that player bots. Mkay..
* ```(ipbot rem [ip || id(in game) || all])```

> So basically, you are working with a system. When you even restart the terminal/console the people you added to get bots are stored. When its loaded back, 
the same people you added a long time ago can still get bots from the IP you added. Kindof like whitelisting for bots if you can say.

*  ```(ipbot cache)```

> Views you the players you have on the botlist.

* ```(ipbot getid [ip])```

> A little tool you can use. You can grab a ID(in game) by using a IP address.  **Just a little tool** 

* ```(ipbot getip [id])```

> A little tool you can use. You can grab someones IP with there ID. **Just a little tool**

##### Configuration
* **botname** - Mainly, you can decide what your bots spawn as for your list.

* **You need the SuperMinion plugin to use these.**

* **superminions** - 0 = No super minions.(**You have to have the plugin installed**).

* **supermass** - 10 = The mass of the minions.

* **superspeed** - 35 = The speed of the minions.

##### System.
> Your botlist is always saved and stored in the file (**log.json**) which stores your bot list. When your server restart, or ever
to have close, you will have a backup of your list that you can access, and players thats was previoulsy on the list will get access
to the bots without you have to re-gain. They will always have bots until you remove them.


