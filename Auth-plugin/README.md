# Auth plugin
A plugin that adds auth

## How to register
You can either register on the console or in game, press space when you get in and then press w. then tpye your username in the nickname box. Then press play and press w. type your password and press w. press w again to login.

## how to login
press w, press w again, type username, press w, type pass, press w

## Configs
 1. Requirelogin: if 1, it will require login
 2. Allowregister: if 1, it will allow register
 3. Plugin: if 0, the plugin is disabled
 4. Reservenames: if 1, names will be reserved, (like in mcpe servers)
 5. recordint: number of seconds until the account datas are recorded
 6. hidelogin: Hides auth until you press q
 7. kicktime: Number of seconds until kick if player is unresponsive

## Command
Auth - Used to do everything. use auth [command] [params]. commands are:

 * power: turn on and off the plugin
 * Edit [username] [parname] [value] : Edit account data
 * register [username] [pass] : registers an account
 * Remove [username] : removes an account
 * record : records account data
 * reload : reloads account data

## API

Use gameServer.afterauth(player) that runs after authentication
player.accountid is the index where a certain players account is
use player.auth to see if player authenticated
use player.guest to see if he is a guest
use gameServer.onregister(player) to do things after registering
gameServer.account is where all the account data is located
use gameServer.aeon (1 = on, 0 = off) to see if this plugin is enabled
use gameServer.extraregpar to add  parameters when registrating
