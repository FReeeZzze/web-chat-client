import React, { useContext } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { setThemeActiveBG, setThemeActiveColor } from 'utils/theme.utils';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from 'components/ListItem';
import { actions } from 'store/reducers/mainReducer/mainReducer';
import { RootState } from 'store';
import { AuthContext } from 'context/AuthContext';
import LastMessage from './components/LastMessage';
import s from './FilteredList.module.scss';

interface Props {
  isSearch: boolean;
  isBlack: boolean;
}

const useStyles = makeStyles(() =>
  createStyles({
    default: {
      transition: '100ms background ease-in-out',
      '&:hover': {
        transition: '100ms background ease-in-out',
        background: 'rgba(255, 255, 255, 0.1)',
      },
      '&:focus': {
        outline: 'none',
      },
    },
    active: (isBlack: boolean) => ({
      background: setThemeActiveBG(isBlack),
      '& div': {
        color: setThemeActiveColor(isBlack),
      },
      '&:focus': {
        outline: 'none',
      },
    }),
  })
);

const FilteredList = ({ isSearch, isBlack }: Props): JSX.Element => {
  const { Users, selectedUser, searchUser } = useSelector(
    (state: RootState) => state.main
  );
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const styles = useStyles(isBlack);
  return (
    <div className={s.list}>
      {Users.filter((user) => {
        if (
          isSearch &&
          (user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
            user.username.toLowerCase().includes(searchUser.toLowerCase()))
        )
          return user;

        for (let key of user.dialogs) {
          if (key?.users?.includes(auth.userId)) {
            return user;
          }
        }

        return !user;
      }).map((item, index) => (
        <ListItem
          key={`${item._id} - ${index}`}
          name={item.name}
          message={
            item.dialogs.length > 0 ? (
              <LastMessage item={item.dialogs} />
            ) : (
              <></>
            )
          }
          className={item._id === selectedUser ? styles.active : styles.default}
          onClick={() => dispatch(actions.setSelectedUser(item._id))}
          time=""
        />
      ))}
    </div>
  );
};

export default FilteredList;
