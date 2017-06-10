const shaka = require('./lib/shaka-player.compiled.js');

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
      this.videoElement.play();
    });
  }
};

module.exports = EyevinnPlayer;