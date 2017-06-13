const PT = require('./presentation_time.js');

class Controllers {
  constructor(videoContainerElement) {
    this.videoContainerElement = videoContainerElement;
    this.showingStats = false;
  }

  render() {
    this.videoContainerElement.className = "eyevinn-player-container";

    const controlBarElement = document.createElement('div');
    controlBarElement.className = "eyevinn-player-controls-wrapper eyevinn-player-controls-hide";
    const controlBarControls = document.createElement('div');
    controlBarControls.className = "eyevinn-player-controls";
    controlBarElement.appendChild(controlBarControls);
    this.controlBarElement = controlBarElement;

    const controlBarLogo = document.createElement('div');
    controlBarLogo.className = "eyevinn-player-logo";
    controlBarElement.appendChild(controlBarLogo);

    // Play/Pause button
    const controlBarPlayPause = document.createElement('div');
    controlBarPlayPause.className = "eyevinn-player-controls-playpause controls-playing";
    controlBarControls.appendChild(controlBarPlayPause);
    this.controlBarPlayPause = controlBarPlayPause;

    // Mute/Unmute button
    const controlBarMuteUnmute = document.createElement('div');
    controlBarMuteUnmute.className = "eyevinn-player-controls-muteunmute controls-muted";
    controlBarControls.appendChild(controlBarMuteUnmute);
    this.controlBarMuteUnmute = controlBarMuteUnmute;

    // Show stats button
    const controlBarStats= document.createElement('div');
    controlBarStats.className = "eyevinn-player-controls-stats";
    controlBarControls.appendChild(controlBarStats);
    this.controlBarStats = controlBarStats;
    
    this.videoContainerElement.appendChild(controlBarElement);

    const statsElement = document.createElement('div');
    statsElement.className = "eyevinn-player-stats-wrapper eyevinn-player-stats-hide";
    this.statsElement = statsElement;

    this.videoContainerElement.appendChild(statsElement);
  }

  renderStats() {
    const shakaStats = this.shakaPlayer.getStats();

    let statsHtml = "<p>";
    statsHtml += new PT(this.videoElement.currentTime).toHHMMSS();
    if (!isNaN(shakaStats.decodedFrames)) {
      statsHtml += " (" + shakaStats.decodedFrames + " decoded / " + shakaStats.droppedFrames + " dropped)";
    }
    statsHtml += "</p>";
    statsHtml += "<p>";
    statsHtml += shakaStats.width + "x" + shakaStats.height;
    statsHtml += " (" + Math.floor(shakaStats.streamBandwidth / 1000) + " kbps / " + Math.floor(shakaStats.estimatedBandwidth / 1000) + " kbps estimated bw)"
    statsHtml += "</p>";

    this.statsElement.innerHTML = statsHtml;
  }

  initInteractionHandlers(videoElement) {
    this.videoElement = videoElement;

    this.videoContainerElement.addEventListener("mouseover", () => {
      this.controlBarElement.className = "eyevinn-player-controls-wrapper eyevinn-player-controls-show";
    });
    this.videoContainerElement.addEventListener("mouseout", () => {
      this.controlBarElement.className = "eyevinn-player-controls-wrapper eyevinn-player-controls-hide";
    });

    this.controlBarPlayPause.addEventListener("click", () => {
      if (this.videoElement.paused) {
        this.videoElement.play();        
      } else {
        this.videoElement.pause();      
      }
    });

    this.controlBarMuteUnmute.addEventListener("click", () => {
      if (this.videoElement.muted) {
        this.videoElement.muted = false;
      } else {
        this.videoElement.muted = true;
      }
    });

    this.controlBarStats.addEventListener("click", () => {
      this.showingStats = !this.showingStats;
      if (!this.showingStats) {
        this.statsElement.className = "eyevinn-player-stats-wrapper eyevinn-player-stats-hide";
      } else {
        this.statsElement.className = "eyevinn-player-stats-wrapper eyevinn-player-stats-show";        
      }
    });
  }

  initRenderEvents(videoElement) {
    this.videoElement.addEventListener("playing", () => {
      this.controlBarPlayPause.className = "eyevinn-player-controls-playpause controls-playing";
    });
    this.videoElement.addEventListener("pause", () => {
      this.controlBarPlayPause.className = "eyevinn-player-controls-playpause controls-paused";
    });
    this.videoElement.addEventListener("volumechange", () => {
      if (this.videoElement.muted) {
        this.controlBarMuteUnmute.className = "eyevinn-player-controls-muteunmute controls-muted";
      } else {
        this.controlBarMuteUnmute.className = "eyevinn-player-controls-muteunmute controls-unmuted";
      }
    });
  }

  initRenderStats(videoElement, shakaPlayer) {
    this.shakaPlayer = shakaPlayer;

    this.videoElement.addEventListener("timeupdate", () => {
      this.renderStats();  
    });
  }
};

module.exports = Controllers;