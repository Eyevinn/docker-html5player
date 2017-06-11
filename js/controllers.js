class Controllers {
  constructor(videoContainerElement) {
    this.videoContainerElement = videoContainerElement;
  }

  render() {
    this.videoContainerElement.className = "eyevinn-player-container";

    const controlBarElement = document.createElement('div');
    controlBarElement.className = "eyevinn-player-controls-wrapper controls-animate";
    const controlBarBackgroundElement = document.createElement('div');
    controlBarBackgroundElement.className = "eyevinn-player-controls-background";
    controlBarElement.appendChild(controlBarBackgroundElement);
    const controlBarControls = document.createElement('div');
    controlBarControls.className = "eyevinn-player-controls";
    controlBarElement.appendChild(controlBarControls);

    // Play/Pause button
    const controlBarPlayPause = document.createElement('div');
    controlBarPlayPause.className = "eyevinn-player-controls-playpause controls-paused";
    controlBarControls.appendChild(controlBarPlayPause);

    this.videoContainerElement.appendChild(controlBarElement);


  }
};

module.exports = Controllers;