class PresentationTime {
  constructor(sec) {
    this.seconds = sec;
  }

  toHHMMSS() {
    const pad = function(input) {return input < 10 ? "0" + input : input;};
    return [
        pad(Math.floor(this.seconds / 3600)),
        pad(Math.floor(this.seconds % 3600 / 60)),
        pad(Math.floor(this.seconds % 60)),
    ].join(':');
  }
};

module.exports = PresentationTime;