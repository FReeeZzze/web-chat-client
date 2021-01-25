import React from 'react';
import { string, bool, func } from 'prop-types';
import { ReactMic } from 'react-mic';
import { setChatInput, setPanelBG } from 'utils/theme.utils';
import { msToSeconds, msToTime, mToMs } from 'utils/dateFormat';

const MicroRec = ({ className, record, isBlack, setUploadData }) => {
  const onData = () => {
    console.log('Вызов с интервалом в 10ms');
  };

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
    <ReactMic
      record={record}
      className={className}
      onStop={onStop}
      onData={onData}
      strokeColor={setChatInput(isBlack)}
      backgroundColor={setPanelBG(isBlack)}
    />
  );
};

MicroRec.defaultProps = {
  className: '',
  record: false,
};

MicroRec.propTypes = {
  className: string,
  record: bool,
  isBlack: bool,
  setUploadData: func,
};

export default React.memo(MicroRec);
