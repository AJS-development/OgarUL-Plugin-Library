# Auth plugin
A plugin that adds auth

## How to register
You can either register on the console or in game, press space when you get in and then press w. then tpye your username in the nickname box. Then press play and press w. type your password and press w. press w again to login.

## how to login
press w, press w again, type username, press w, type pass, press w

## Configs
Requirelogin: if 1, it will require login
Allowregister: if 1, it will allow register
Plugin: if 0, the plugin is disabled
Reservenames: if 1, names will be reserved, (like in mcpe servers)
recordint: number of seconds until the account datas are recorded

## Command
Auth - Used to do everything. use auth [command] [params]. commands are:

 * power: turn on and off the plugin
 * Edit [username] [parname] [value] : Edit account data
 * register [username] [pass] : registers an account
 * Remove [username] : removes an account
 * record : records account data

## API

Use gameServer.afterauth(player) that runs after authentication
player.accountid is the index where a certain players account is
use gameServer.onregister(player) to do things after registering, return values are added to the account data
gameServer.account is where all the account data is located
