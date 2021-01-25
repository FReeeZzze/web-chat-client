import React, { useContext } from 'react';
import { string } from 'prop-types';
import { useSelector } from 'react-redux';
import { Button, InputBase, makeStyles } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import {
  setPanelBG,
  setThemePlaceHolder,
  setChatInput,
} from 'utils/theme.utils';
import {
  fetchCreateMessage,
  fetchUploadFile,
} from 'store/thunks/contactsThunk';
import useHttp from 'hooks/http.hook';
import { AuthContext } from 'context/AuthContext';
import MicroRec from 'components/MicroRec';
import CSSTransition from 'react-transition-group/CSSTransition';

const useStyles = makeStyles((theme) => ({
  sendBox: (props) => ({
    width: '100%',
    wordBreak: 'wrap',
    display: 'grid',
    gridTemplate: 'auto auto / 1fr 8fr 1fr',
    borderTop: '1px solid black',
    maxHeight: '250px',
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
  button: (props) => ({
    margin: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    boxShadow: 'none',
    transition: props.message ? 'margin .5s easy-in-out' : 'none',
    '& svg': {
      fill: !props.isBlack ? '#000' : 'rgb(200,200,200)',
    },
    '&:hover': {
      boxShadow: 'none',
      background: 'rgba(0, 0, 0, 0)',
      '& svg': {
        fill: !props.isBlack ? '#000' : 'rgb(200,200,200)',
      },
    },
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
  iconEnter: {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  iconEnterActive: {
    opacity: 1,
    transform: 'translateX(0)',
    transition: 'opacity 300ms, transform 300ms',
  },
  iconExit: {
    opacity: 1,
  },
  iconExitActive: {
    opacity: 0,
    transform: 'scale(0.9)',
    transition: 'opacity 300ms, transform 300ms',
  },
}));

const SendPanel = ({ className }) => {
  const [uploadData, setUploadData] = React.useState({});
  const [showMicroIcon, setShowIcon] = React.useState(true);
  const [message, setMessage] = React.useState('');
  const [record, setRecord] = React.useState(false);
  const { selected } = useSelector((state) => state.theme);
  const { currentDialog } = useSelector((state) => state.contacts);
  const isBlack = selected === 'black';
  const classes = useStyles({ isBlack, record, message });
  const { request } = useHttp();
  const auth = useContext(AuthContext);

  const getPartner = React.useCallback(() => {
    return currentDialog.users.filter((user) => !user.includes(auth.userId));
  }, [auth, currentDialog]);

  const handleSendMessage = () => {
    setMessage('');
    fetchCreateMessage(
      request,
      auth.token,
      currentDialog._id,
      message,
      null,
      getPartner()[0]
    );
  };

  React.useEffect(() => {
    if (Object.keys(uploadData).length > 0) {
      const { fileData, data } = uploadData;
      fetchUploadFile(auth.token, fileData, data).then((r) => {
        fetchCreateMessage(
          request,
          auth.token,
          currentDialog._id,
          null,
          r.file,
          getPartner()[0]
        );
      });
      setUploadData({});
    }
  }, [getPartner, request, auth, uploadData, currentDialog]);

  const handleMicro = () => {
    setRecord((prev) => !prev);
  };

  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className={`${classes.sendBox} ${className}`}>
      <Button variant="contained" color="primary" className={classes.button}>
        <AttachFileIcon fontSize="large" className={classes.icon} />
      </Button>
      <MicroRec
        setUploadData={setUploadData}
        className={classes.soundWave}
        isBlack={isBlack}
        record={record}
      />
      <InputBase
        className={classes.chat}
        placeholder="Написать сообщение..."
        value={message}
        onChange={handleChangeMessage}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={message ? handleSendMessage : handleMicro}
      >
        {showMicroIcon && <MicIcon fontSize="large" className={classes.icon} />}
        <CSSTransition
          in={!!message}
          timeout={300}
          unmountOnExit
          classNames={{
            enter: classes.iconEnter,
            enterActive: classes.iconEnterActive,
            exit: classes.iconExit,
            exitActive: classes.iconExitActive,
          }}
          onEnter={() => setShowIcon(false)}
          onExited={() => setShowIcon(true)}
        >
          <SendIcon fontSize="large" className={classes.icon} />
        </CSSTransition>
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

export default React.memo(SendPanel);
