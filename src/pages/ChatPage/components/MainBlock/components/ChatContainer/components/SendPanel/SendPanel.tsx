import React from 'react';
import { useSelector } from 'react-redux';
import { Button, InputBase, makeStyles, createStyles } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import {
  setPanelBG,
  setThemePlaceHolder,
  setChatInput,
} from 'utils/theme.utils';

const useStyles = makeStyles((theme) =>
  createStyles({
    sendBox: (isBlack: boolean) => ({
      width: '100%',
      display: 'grid',
      gridTemplate: 'auto / 4fr 1fr',
      borderTop: '1px solid black',
      height: '50px',
      marginTop: 'auto',
      background: setPanelBG(isBlack),
    }),
    chat: (isBlack: boolean) => ({
      margin: theme.spacing(1),
      '& input': {
        color: setChatInput(isBlack),
        textIndent: '5%',
      },
      '& input::placeholder': {
        color: setThemePlaceHolder(isBlack),
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
  })
);

interface Props {
  className?: string;
}

interface RootState {
  theme: {
    selected: string;
  };
}

const SendPanel = ({ className }: Props): JSX.Element => {
  const [message, setMessage] = React.useState('');
  const { selected } = useSelector((state: RootState) => state.theme);
  const isBlack: boolean = selected === 'black';
  const classes = useStyles(isBlack);

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
        endIcon={<SendIcon>Send</SendIcon>}
      >
        Отправить
      </Button>
    </div>
  );
};

export default SendPanel;
