# Advertisement plugin
Add ad's to the client! (this is to say f you moneyclip, our users get money).


### Why?
Usually, we dont support money making. But we also want to insult Moneyclip. We cant host ads because we are open source and us doing that might get use sued. But if you users host ads instead of us, we can insult them but still be fine.


### Usage
Configure using ads.json.

```
name: the name of the ad
type: either image or text or custom.
data: url for the image or the text for the text ad, and the HTML for custom
dimx: The width of the ad (optional and only for imgs)
dimy: the height of the ad (optional and only for img)
duration: Duration of the add to display (in sec)
link: url to redirect to. Optional
```


Please note .json types are very strict. Dont ask us about .json, learn it on the web. 
### Command
>ads [command]

##### Commands
1. reload - reloads ads
2. power - turns on/off ads

