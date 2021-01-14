import React, { useContext } from 'react';
import { string } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button, InputBase, makeStyles } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import {
  setPanelBG,
  setThemePlaceHolder,
  setChatInput,
} from 'utils/theme.utils';
import { mToMs, msToSeconds, msToTime } from 'utils/dateFormat';
import { ReactMic } from 'react-mic';
import {
  fetchCreateMessage,
  fetchUploadFile,
} from 'store/thunks/contactsThunk';
import useHttp from 'hooks/http.hook';
import { AuthContext } from 'context/AuthContext';

const useStyles = makeStyles((theme) => ({
  sendBox: (props) => ({
    width: '100%',
    display: 'grid',
    gridTemplate: 'auto / 5fr 2fr 2fr 1fr',
    borderTop: '1px solid black',
    height: '50px',
    marginTop: 'auto',
    background: setPanelBG(props.isBlack),
  }),
  chat: (props) => ({
    margin: theme.spacing(1),
    '& input': {
      color: setChatInput(props.isBlack),
      textIndent: '5%',
    },
    '& input::placeholder': {
      color: setThemePlaceHolder(props.isBlack),
      fontSize: '16px',
    },
  }),
  button: () => ({
    margin: 'auto',
    color: 'black',
    background: 'gray',
    '&:hover': {
      background: 'gray',
    },
  }),
  microphone: () => ({
    margin: 'auto',
  }),
  soundWave: () => ({
    maxHeight: '49px',
    margin: 'auto',
    width: '100%',
  }),
  icon: (props) => ({
    fill: props.record ? '#f23535' : '#FFF',
  }),
}));

const SendPanel = ({ className }) => {
  const [message, setMessage] = React.useState('');
  const [record, setRecord] = React.useState(false);
  const { selected } = useSelector((state) => state.theme);
  const { currentDialog } = useSelector((state) => state.contacts);
  const isBlack = selected === 'black';
  const classes = useStyles({ isBlack, record });
  const { request } = useHttp();
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();

  const handleSendMessage = () => {
    const partner = currentDialog.users.filter(
      (user) => !user.includes(auth.userId)
    );
    setMessage('');
    fetchCreateMessage(
      request,
      auth.token,
      currentDialog._id,
      message,
      null,
      partner[0]
    );
  };

  const handleMicro = () => {
    setRecord((prev) => !prev);
  };

  const onData = () => {
    console.log('Вызов с интервалом в 10ms');
  };

  const onStop = (recordedBlob) => {
    const fileData = new FormData();
    fileData.append(
      'fileData',
      recordedBlob.blob,
      `${recordedBlob.blob.size}.wave`
    );
    const GMT_2 = 7200000;
    const data = {
      id: recordedBlob.blob.size,
      timeEnd: mToMs(recordedBlob.stopTime - recordedBlob.startTime),
      data: msToTime(recordedBlob.stopTime + GMT_2),
      max: msToSeconds(recordedBlob.stopTime - recordedBlob.startTime),
      size: recordedBlob.blob.size,
      delivered: false,
    };
    dispatch(fetchUploadFile(auth.token, fileData, data));
    console.log('recordedBlob: ', recordedBlob);
  };

  return (
    <div className={`${classes.sendBox} ${className}`}>
      <InputBase
        className={classes.chat}
        placeholder="Написать сообщение..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleSendMessage}
        endIcon={<SendIcon>Send</SendIcon>}
      >
        Отправить
      </Button>
      <ReactMic
        record={record}
        className={classes.soundWave}
        onStop={onStop}
        onData={onData}
        mimeType="audio/wav"
        strokeColor={setChatInput(isBlack)}
        backgroundColor={setPanelBG(isBlack)}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.microphone}
        onClick={handleMicro}
      >
        <MicIcon fontSize="large" className={classes.icon} />
      </Button>
    </div>
  );
};

SendPanel.defaultProps = {
  className: '',
};

SendPanel.propTypes = {
  className: string,
};

export default SendPanel;
