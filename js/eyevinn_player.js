const shaka = require('./lib/shaka-player.compiled.js');
const Controllers = require('./controllers.js');

class EyevinnPlayer {
  constructor(playerElement, videoSource) {
    this.playerElement = playerElement;
    this.videoSource = videoSource;
  }

  init() {
    this.videoElement = document.createElement('video');
    this.videoElement.className = 'eyevinn-player';
    this.playerElement.appendChild(this.videoElement);
    this.shakaPlayer = new shaka.Player(this.videoElement);

    this.shakaPlayer.configure({
      streaming: {
        jumpLargeGaps: true,
      },
      manifest: {
        dash: { clockSyncUri: this.videoSource }
      }
    });
    this.shakaPlayer.load(this.videoSource)
    .then((ev) => {
      this.videoControllers = new Controllers(this.playerElement);
      this.videoControllers.render();
      this.videoControllers.initInteractionHandlers(this.videoElement);
      this.videoControllers.initRenderEvents(this.videoElement);
      this.videoControllers.initRenderStats(this.videoElement, this.shakaPlayer);
    
      this.videoElement.muted = true;
      this.videoElement.play();
    });
  }
};

module.exports = EyevinnPlayer;