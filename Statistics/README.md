###### Statistics 
>> Installing & using statistics you are giving permissions to ogarul to publicly share your server with only ogarul client, and ogarul statistics services. These services will provide access to people who wants to play, to come and play on your server. 

###### Information
Hereby declare of public information used with statistics
* Amount of players
* Amount of bots
* Recent players
* Server ping / connectivity strength
* Server Host, Port, and Statistics port
* Server (OgarUL) version
* Server Gamemode
* Server gameplay time / Longevity of running services
* Server provided name

###### Installation
Whilst running OgarUL, proceed to input the command below. **DO NOT DOWNLOAD MANUALLY**
>> plugin install Statistics

###### How to use
* **Required**: You MUST, have your **Server Stat Port** Open. If this is not open, your server will not show on the list. This is required for us to determine if your server is online or not.
* First off, after you have ran the command above to install statistics locate the file **config.ini** inside the plugins folder in the main directory. **./src/plugins/Statistics**

You now have a few basic configurations. I will explain which each and every last one of them does.

Configuration      | Usage
-------------------|--------------
enable & disable   | 0 = false, 1 = true. Use these numbers to enable, or disable certain things.
serverName         | Your server name will be your unique name for your server. Everyone will know your server by this name.
alerts             | If you want alerts on information during the use of Statistics, enable or disable this.
usevpsip           | If you have a custom domain, or anything in that nature, you can disable this, or else leave it be.
customip           | Custom domain. If you disable usevpsip, a custom domain name will be used instead.
optout             | If you no longer want to have your server listed, nor being used, enable this to disable statistics functionalities, and to keep the plugin without actually deleting it.
clientlink         | Currently deprecated. Only the client **play.ogarul.tk** will be used.
debug              | If you want to know what type of information being send to the server every minute, enable this.

###### Commands (stats or statistics)
Command           | Usage
------------------|-------------
stats (reload, refresh, create) | Refreshes, or created, or reload your server on the list if its not updating, or isnt showing at all.
stats delete      | Deletes your server from the list.
stats abort       | Deletes your server from the list, and deletes the plugin.
stats override    | Create, or re-save your configurations. If you want to update the plugin this is a good idea.
stats enable      | If you have disabled statistics use, you can enable it.
stats disable     | If you have enabled statistics use, you can disable it.
stats ping        | If you want to know your ping responce from google, this is the command you are looking for

###### HELLP! My server isnt showing??
By default installation, Statistics will not work until configured. You **HAVE** to provide a specific server name for your server. If you don't Statistics will not run at all. You will also be alerted in console if your server has been added to this list or not. You have to have your stat port open. If you are getting errors, delete statistics and reinstall using the command above. If you have any other unrelated issues make an issue about Statistics here https://github.com/AJS-development/OgarUL-Plugin-Library/issues
