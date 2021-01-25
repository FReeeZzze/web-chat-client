import React, { Component } from 'react';
import { any } from 'prop-types';

class AudioVisualiser extends Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    const { audio } = this.props;
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.source = this.audioContext.createMediaElementSource(audio);
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 512;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.source.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);
    this.rafId = requestAnimationFrame(this.tick);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
    if (this.analyser && this.source) {
      this.analyser.disconnect();
      this.source.disconnect();
    }
  }

  tick() {
    const canvas = this.canvas.current;
    const height = canvas.height;
    const width = canvas.width;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, width, height);

    this.analyser.getByteFrequencyData(this.dataArray);

    const barWidth = (width * 2) / this.bufferLength;
    let barHeight;
    let x = 0;

    const heightScale = (height * 1.3) / 128;

    for (let i = 0; i < this.bufferLength; i += 1) {
      barHeight = this.dataArray[i];

      context.fillStyle = '#86A5CE';
      barHeight *= heightScale;
      context.fillRect(x, height - barHeight / 2, barWidth, barHeight / 2);
      // 2 - количество пикселей между столбцами
      x += barWidth + 3;
    }
    this.rafId = requestAnimationFrame(this.tick);
  }

  render() {
    return <canvas width="150" height="20" ref={this.canvas} />;
  }
}

AudioVisualiser.propTypes = {
  audio: any,
};

export default AudioVisualiser;
