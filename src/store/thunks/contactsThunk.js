import { actions } from 'store/reducers/contactsReducer';

export const findContacts = (request, token, search) => async (dispatch) => {
  try {
    const data = await request(`/api/user?search=${search}`, 'GET', null, {
      Authorization: `Bearer ${token}`,
    });
    const users = data.result;
    dispatch(actions.setSearchContacts(users));
  } catch (e) {
    console.log(e.message);
  }
};

export const fetchMe = (request, token) => async (dispatch) => {
  const me = await request('/api/user/me', 'GET', null, {
    Authorization: `Bearer ${token}`,
  });
  dispatch(actions.setMe(me.result));
};

export const getMyContacts = (request, token) => async (dispatch) => {
  try {
    const data = await request('/api/user/contacts', 'GET', null, {
      Authorization: `Bearer ${token}`,
    });
    const dialogs = data.result;
    dispatch(actions.setContacts(dialogs));
  } catch (e) {
    console.log(e.message);
  }
};

export const clearSearchContacts = () => (dispatch) => {
  dispatch(actions.clearSearchContacts());
};

export const addContact = (request, token, contact) => async (dispatch) => {
  try {
    const data = await request(
      '/api/user/add',
      'PUT',
      { id: contact._id },
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    );
    console.log(data);
    dispatch(actions.addContact(contact));
  } catch (e) {
    console.log(e.message);
  }
};

export const fetchMessages = (request, token, id) => async (dispatch) => {
  try {
    const data = await request(
      '/api/messages',
      'POST',
      { dialog: id },
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    );
    dispatch(actions.setMessages(data.result));
  } catch (e) {
    console.log(e.message);
  }
};

export const newMessage = (message) => (dispatch) => {
  dispatch(actions.setMessage(message));
};

export const addCurrentDialog = (dialog) => (dispatch) => {
  dispatch(actions.setCurrentDialog(dialog));
};

export const fetchCreateMessage = async (
  request,
  token,
  dialogId,
  message,
  attachments,
  partner
) => {
  try {
    const data = await request(
      '/api/message',
      'POST',
      { message, attachments, partner, dialogId },
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    );
    console.log(data);
  } catch (e) {
    console.log(e.message);
  }
};

export const fetchCreateDialog = (request, token, user) => async (dispatch) => {
  try {
    const data = await request(
      '/api/dialog',
      'POST',
      { id_user: user },
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    );
    console.log(data);
    dispatch(actions.setSelectedContact(user));
  } catch (e) {
    console.log(e.message);
  }
};

export const fetchUploadFile = (token, file) => async (dispatch) => {
  try {
    const result = await fetch('/api/files', {
      method: 'POST',
      body: file,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(result);
    dispatch(actions.setMessage(''));
  } catch (e) {
    console.log(e.message);
  }
};
