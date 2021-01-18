import React from 'react';
import { string, number, bool } from 'prop-types';
import { makeStyles } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { secondsToMs } from 'utils/dateFormat';
import { numberWithDots } from 'utils/other';
import AudioVisualiser from './AudioVisualiser';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    width: '100%',
    maxWidth: 350,
    minHeight: 50,
    padding: 10,
    margin: '0 5px',
    backgroundColor: '#3D4A5D',
    borderRadius: '5px',
    color: '#819EA7',
    fontSize: 14,
  },
  button: {
    cursor: 'pointer',
    width: 50,
    height: 50,
    backgroundColor: '#86A5CE',
    borderRadius: '30px',
    display: 'flex',
    alignSelf: 'center',
    '&:focus': {
      outline: 'none',
    },
    '& svg': {
      fill: '#FFF',
      margin: 'auto',
    },
  },
  inner: {
    display: 'grid',
  },
  timer: {
    gridRow: '2',
    marginLeft: 5,
    alignSelf: 'flex-end',
  },
  visualizer: {
    alignSelf: 'center',
    margin: '0 5px',
    gridRow: '1',
  },
  date: {
    fontSize: 12,
    alignSelf: 'flex-end',
    marginLeft: 'auto',
  },
  delivered: {
    marginLeft: 5,
    display: 'flex',
    alignSelf: 'flex-end',
  },
}));

const AudioItem = ({ timeEnd, duration, date, size, url, delivered }) => {
  const styles = useStyles();
  const player = React.useRef({});
  const [isPlaying, setPlaying] = React.useState(false);
  const [timer, setTimer] = React.useState(0);
  const interval = React.useRef({});

  React.useEffect(() => {
    interval.current = setInterval(() => {
      if (isPlaying && !player.current.ended && duration > timer) {
        setTimer((prev) => prev + 1);
      } else setPlaying(false);
    }, 1000);
    return () => {
      clearInterval(interval.current);
    };
  }, [timer, duration, isPlaying, player]);

  const handlePlayAudio = () => {
    if (isPlaying) {
      player.current.pause();
    } else {
      player.current.play();
    }
    setTimer(0);
    setPlaying((prev) => !prev);
  };

  return (
    <div className={styles.root}>
      <div
        tabIndex={0}
        role="button"
        onClick={handlePlayAudio}
        onKeyPress={(e) => e.key === 'Enter' && handlePlayAudio()}
        className={styles.button}
      >
        {!isPlaying ? (
          <PlayArrowIcon fontSize="large" />
        ) : (
          <PauseIcon fontSize="large" />
        )}
      </div>
      <div className={styles.inner}>
        <div className={styles.timer}>
          {timeEnd &&
            `${secondsToMs(timer)} / ${timeEnd}, ${numberWithDots(size)} КБ`}
        </div>
        <div className={styles.visualizer}>
          {Object.keys(player.current).length > 0 && (
            <AudioVisualiser
              audio={player.current}
              isPlaying={isPlaying && !player.current.ended}
            />
          )}
        </div>
      </div>
      <div className={styles.date}>{date}</div>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio id="RadioPlayerAudioTeg" preload="none" ref={player} src={url} />
      <div className={styles.delivered}>
        {delivered ? (
          <DoneAllIcon fontSize="small" />
        ) : (
          <DoneIcon fontSize="small" />
        )}
      </div>
    </div>
  );
};

AudioItem.defaultProps = {
  duration: 0,
  timeEnd: '',
  size: 0,
  date: '',
  url: '',
  delivered: false,
};

AudioItem.propTypes = {
  duration: number,
  timeEnd: string,
  size: number,
  date: string,
  url: string,
  delivered: bool,
};

export default AudioItem;
