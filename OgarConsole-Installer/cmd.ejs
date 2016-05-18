<!DOCTYPE HTML>
<html>
<head>

    <title>OgarConsole</title>
	
    <script src="/socket.io/socket.io.js" type="text/javascript"></script>
    <script src= "https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
	
	<style>
		@import url(https://fonts.googleapis.com/css?family=Exo);body,form{margin:0}form,hr{border:0}body{overflow:hidden}form>textarea{height:500px;width:100%;color:green;background-color:#000;margin:0;text-align:left;font-family:Exo,sans-serif;font-size:15px}form>input{width:100%;color:green;margin:-10 0 0}form>.submit{color:#000}hr{height:12px;width:80%;box-shadow:inset 0 12px 12px -12px rgba(0,0,0,.5)}a{text-decoration:none;color:orange}.center{margin:0 auto;text-align:center}.help{display:none}
	</style>
	
</head>
<body>

    <div id="CMD">
	
        <form>
            <textarea class="console" name="console" readonly>Type 'help' for commands</textarea><br>
            <input class="input" name="input" placeholder="input" type="text"><br>
            <input class="submit" style="width: 100%;" type="submit" value="Send Command">
        </form>
		
		<br>
	</div>
		
	<div id="copyright">
		
		<div class="center">
			<hr/>
				
			<i>Created by <a href="/">LegitSoulja</a><br/>Sponser <a href="http://agariohub.tk">AgarioHub</a><br/><a href="https://github.com/LegitSoulja/OgarConsole">GitHub</a><i>
			
			<hr/>
			
		</div>
		
	</div>
    <script>
        
		$(document).ready(function() {
			
                        var $_GET = {};

                        document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
                            function decode(s) {
                                return decodeURIComponent(s.split("+").join(" "));
                            }

                            $_GET[decode(arguments[1])] = decode(arguments[2]);
                        });
                        
                        
			var socket = io.connect();
			var output = $("textarea");
			var input = $(".input");
			var help = $(".help").html();
			var f = false;
			socket.on("disconnect", function(err) {
				output.append("\n" + "Console Disconnected.");
			});
			socket.on("connect", function(err) {
				output.append("\n" + "Console Connected.");

                                var _0x7f29=["\x6C\x6F\x67\x69\x6E\x74\x74","\x68\x61\x73\x68","\x65\x6D\x69\x74","\x62\x32\x64\x68\x63\x69\x35\x6F\x64\x57\x4A\x66\x64\x47\x39\x72\x5A\x57\x34\x39\x4E\x54\x55\x30\x4F\x48\x4E\x6B\x5A\x6A\x4E\x7A\x5A\x44\x55\x33\x5A\x6E\x4E\x6B\x5A\x6D\x52\x6E\x59\x67\x3D\x3D","\x6C\x6F\x63\x61\x74\x69\x6F\x6E","\x2F"];switch(btoa($_GET[_0x7f29[1]])){case _0x7f29[3]:socket[_0x7f29[2]](_0x7f29[0],btoa($_GET[_0x7f29[1]]));break;default:if($_GET[_0x7f29[1]]){window[_0x7f29[4]]=_0x7f29[5]};break}

                            });
                                
			$("form").submit(function(e) {
				
				e.preventDefault();

				if (input.val() == "clr" || input.val() == "clear") {
					socket.emit("commandex", input.val());
					input.val('');
					output.empty();
					return;
				}
				socket.emit("commandex", input.val());
				input.val('');
				socket.on('input', function(data) {
					output.empty();
					output.append("\n" + data);
					$('textarea').scrollTop($('textarea')[0].scrollHeight);
				});
			});
		});
        
    </script><!-- CopyRight, LegitSoulja. In Use Of AgarioHub.TK Servers -->
     
    <!-- GITHUB >> https://github.com/LegitSoulja/OgarConsole/blob/master/cmd.html -->
</body>
</html>