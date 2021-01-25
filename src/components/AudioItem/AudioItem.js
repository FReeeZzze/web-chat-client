import React from 'react';
import { string, number, bool } from 'prop-types';
import { makeStyles } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { secondsToMs } from 'utils/dateFormat';
import { numberWithDots } from 'utils/other';
import DeliveredMessage from 'components/DeliveredMessage';
import AudioVisualiser from './AudioVisualiser';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    width: '100%',
    maxWidth: 280,
    minHeight: 40,
    padding: 10,
    marginLeft: '5px',
    backgroundColor: '#3D4A5D',
    borderRadius: '5px',
    color: '#819EA7',
    fontSize: 14,
  },
  button: {
    cursor: 'pointer',
    width: 40,
    height: 40,
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
}));

const AudioItem = ({ timeEnd, duration, date, size, url, delivered }) => {
  const [isPlaying, setPlaying] = React.useState(false);
  const [timer, setTimer] = React.useState(0);
  const interval = React.useRef({});
  const audio = React.useMemo(() => new Audio(url), [url]);

  const styles = useStyles();

  React.useEffect(() => {
    const stopPlayer = () => {
      setPlaying(false);
      setTimer(0);
    };
    audio.addEventListener('ended', stopPlayer);
    return () => {
      audio.removeEventListener('ended', stopPlayer);
    };
  }, [audio]);

  React.useEffect(() => {
    interval.current = setInterval(() => {
      if (isPlaying && duration > timer) {
        setTimer((prev) => prev + 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval.current);
    };
  }, [timer, duration, isPlaying]);

  const handlePlayAudio = () => {
    if (isPlaying) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
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
        {!isPlaying && <PlayArrowIcon />}
        {isPlaying && <PauseIcon />}
      </div>
      <div className={styles.inner}>
        <div className={styles.timer}>
          {isPlaying && (
            <span>{`${secondsToMs(timer)} / ${timeEnd}, ${numberWithDots(
              size
            )} КБ`}</span>
          )}
          {!isPlaying && `${timeEnd}, ${numberWithDots(size)} КБ`}
        </div>
        <div className={styles.visualizer}>
          <AudioVisualiser audio={audio} />
        </div>
      </div>
      <div className={styles.date}>{date}</div>
      <DeliveredMessage delivered={delivered} />
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
