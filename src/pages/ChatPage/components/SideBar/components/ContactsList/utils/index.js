import dateTimeParseToTime from 'utils/dateFormat';

const getDate = (item) => {
  return dateTimeParseToTime(
    item.messages?.length > 0
      ? item.messages[item.messages?.length - 1].created_at
      : ''
  );
};

export default getDate;
