class Controllers {
  constructor(videoContainerElement) {
    this.videoContainerElement = videoContainerElement;
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

    this.videoContainerElement.appendChild(controlBarElement);
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

    this.initRenderEvents(this.videoElement);
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
};

module.exports = Controllers;