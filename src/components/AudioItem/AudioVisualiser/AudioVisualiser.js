import React, { Component } from 'react';

class AudioVisualiser extends Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    if (this.props.isPlaying) {
      this.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      this.source = this.audioContext.createMediaElementSource(
        this.props.audio
      );
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 512;
      this.bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(this.bufferLength);
      this.source.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
      this.rafId = requestAnimationFrame(this.tick);
    }
  }

  tick() {
    const canvas = this.canvas.current;
    const height = canvas.height;
    const width = canvas.width;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, width, height);

    this.analyser.getByteFrequencyData(this.dataArray);

    let barWidth = width / this.bufferLength;
    let barHeight;
    let x = 0;

    let heightScale = height / 128;

    for (let i = 0; i < this.bufferLength; i++) {
      barHeight = this.dataArray[i];

      context.fillStyle = '#86A5CE';
      barHeight *= heightScale;
      context.fillRect(x, height - barHeight / 2, barWidth, barHeight / 2);

      // 2 - количество пикселей между столбцами
      x += barWidth + 2;
    }
    this.rafId = requestAnimationFrame(this.tick);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
    this.analyser.disconnect();
    this.source.disconnect();
  }

  render() {
    return <canvas width="230" height="20" ref={this.canvas} />;
  }
}

export default AudioVisualiser;
