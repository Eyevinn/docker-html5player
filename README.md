A Docker Container containing a web application for streaming a video. The HTML5 video player is based on
Shaka Player.

# Example

To spin up a web application on port 3000 for a video stream at `http://www.example.com/example.mpd` run the
following command:

```
docker run -e "SOURCE=http://www.example.com/example.mpd" -p 3000:80 eyevinntechnology/html5player:0.0.2
```

Then point your browser to "http://localhost:3000/"

# Eyevinn HTML5 Player

The Eyevinn HTML5 player is a Javascript player that provides a skin with player controllers on top of Shaka Player.

## Example code

```
<html>
  <head>
    <script type="text/javascript" src="/js/player.js" defer></script>
    <link rel="stylesheet" href="/stylesheets/player.css"/>
  </head>
  <body>
    <div id="player-container"></div>
  </body>
  <script type="text/javascript">
    document.addEventListener('DOMContentLoaded', function(ev) {
      var playerElement = document.getElementById('player-container');
      var player = new EyevinnPlayer(playerElement, 'https://lab.eyevinn.technology/webm/tos/tearsofsteel.mpd');
      player.init();
    });
  </script>
</html>
```
