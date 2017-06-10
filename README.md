A Docker Container containing a web application for streaming a video. The HTML5 video player is based on
Shaka Player.

# Example

To spin up a web application on port 3000 for a video stream at `http://www.example.com/example.mpd` run the
following command:

```
docker run -e "SOURCE=http://www.example.com/example.mpd" -p 3000:80 eyevinntechnology/html5player:0.0.1
```

Then point your browser to "http://localhost:3000/"
