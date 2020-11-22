import { IDialog } from 'store/reducers/mainReducer/types';
import dateTimeParseToTime from 'utils/dateFormat';

const getDate = (item: IDialog): string => {
  return dateTimeParseToTime(
    item.messages.length > 0
      ? item.messages[item.messages.length - 1].created_at
      : ''
  );
};

export { getDate };
