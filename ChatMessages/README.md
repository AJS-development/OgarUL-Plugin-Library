###### Chat Messages
> Aurthor: LegitSoulja
>> Description: Periodic Chat Messages
>>> Date created: 7/11/16
>>>> Request by: @SharkFinPro

##### Chat Messages
###### Configuration
- enabled = Enable and disable message interval
- messageInterval = Time in seconds, of which a message will be sent to all players
- joinmessage = Enable join message when player joins the game. 1 = true, 0 = false

###### Json Configuration
```
{
	"_//":"ChatMessages!. Created by LegitSoulja!.",
	"messages":[
		{"1":"Welcome to ChatMessages!. Created by LegitSoulja!"},
		{"2":"This is a second message!. Don't hate me!"},
		{"3": "Make sure every message is seperated by a comma!"},
		{"4": "This is another message!"}
	],
	"joinmessage": "Welcome {player} to this server!"
}

```

You can add more than one messages, followed by the same pattern, seperated by commas!.
