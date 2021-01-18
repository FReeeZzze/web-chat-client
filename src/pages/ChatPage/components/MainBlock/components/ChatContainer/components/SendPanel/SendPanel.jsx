import React, { useContext } from 'react';
import { string } from 'prop-types';
import { useSelector } from 'react-redux';
import { Button, InputBase, makeStyles } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import {
  setPanelBG,
  setThemePlaceHolder,
  setChatInput,
} from 'utils/theme.utils';
import { ReactMic } from 'react-mic';
import {
  fetchCreateMessage,
  fetchUploadFile,
} from 'store/thunks/contactsThunk';
import useHttp from 'hooks/http.hook';
import { msToTime, mToMs, msToSeconds } from 'utils/dateFormat';
import { AuthContext } from 'context/AuthContext';

const useStyles = makeStyles((theme) => ({
  sendBox: (props) => ({
    width: '100%',
    display: 'grid',
    gridTemplate: 'auto auto / 8fr 2fr 1fr',
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
    margin: 'auto 5px auto 10px',
    color: 'black',
    background: 'gray',
    '&:hover': {
      background: 'gray',
    },
  }),
  microphone: () => ({
    margin: 'auto',
  }),
  soundWave: (props) => ({
    visibility: props.record ? 'visible' : 'hidden',
    position: 'absolute',
    bottom: 50,
    height: '49px',
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
  const [uploadData, setUploadData] = React.useState({});
  const { selected } = useSelector((state) => state.theme);
  const { currentDialog } = useSelector((state) => state.contacts);
  const isBlack = selected === 'black';
  const classes = useStyles({ isBlack, record });
  const { request } = useHttp();
  const auth = useContext(AuthContext);

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

  React.useEffect(() => {
    if (Object.keys(uploadData).length > 0) {
      const partner = currentDialog.users.filter(
        (user) => !user.includes(auth.userId)
      );
      const { fileData, data } = uploadData;
      fetchUploadFile(auth.token, fileData, data).then((r) => {
        fetchCreateMessage(
          request,
          auth.token,
          currentDialog._id,
          null,
          r.file,
          partner[0]
        ).then(() => setUploadData({}));
      });
    }
  }, [request, auth, uploadData, currentDialog]);

  const onStop = (recordedBlob) => {
    const fileData = new FormData();
    const ext = recordedBlob.blob.type.split(';')[0].split('/').pop();
    fileData.append(
      'fileData',
      recordedBlob.blob,
      `${recordedBlob.blob.size}.${ext}`
    );
    const data = {
      timeEnd: mToMs(recordedBlob.stopTime - recordedBlob.startTime),
      date: msToTime(recordedBlob.stopTime + 7200000),
      duration: msToSeconds(recordedBlob.stopTime - recordedBlob.startTime),
    };
    setUploadData((prev) => ({ ...prev, data, fileData }));
  };

  return (
    <div className={`${classes.sendBox} ${className}`}>
      <ReactMic
        record={record}
        className={classes.soundWave}
        onStop={onStop}
        onData={onData}
        strokeColor={setChatInput(isBlack)}
        backgroundColor={setPanelBG(isBlack)}
      />
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
