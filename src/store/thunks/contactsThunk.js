import { actions } from 'store/reducers/contactsReducer';

export const findContactById = async (request, token, userId) => {
  try {
    const data = await request(`/api/user/id?id=${userId}`, 'GET', null, {
      Authorization: `Bearer ${token}`,
    });
    return data.result;
  } catch (e) {
    console.log(e.message);
    return Promise.reject(e.message);
  }
};

export const findContacts = async (request, token, search) => {
  try {
    const data = await request(`/api/user?search=${search}`, 'GET', null, {
      Authorization: `Bearer ${token}`,
    });
    return data.result;
  } catch (e) {
    return Promise.reject(e.message);
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
    const data = await request('/api/user/me/contacts', 'GET', null, {
      Authorization: `Bearer ${token}`,
    });
    console.log('my contacts: ', data);
    const contacts = data.result;
    dispatch(actions.setContacts(contacts));
  } catch (e) {
    console.log(e.message);
  }
};

export const addContact = (contact) => (dispatch) => {
  dispatch(actions.addContact(contact));
};

export const addContactById = async (request, token, contact) => {
  try {
    const data = await request(
      '/api/user/add',
      'PUT',
      { id: contact },
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    );
    console.log('add CONTACT', data.result);
    return data.result;
  } catch (e) {
    console.log(e.message);
    return Promise.reject(e.message);
  }
};

export const fetchMessagesByDialog = (request, token, id) => async (
  dispatch
) => {
  try {
    const data = await request(`/api/messages?dialog=${id}`, 'GET', null, {
      Authorization: `Bearer ${token}`,
    });
    console.log('messages: ', data);
    dispatch(actions.setMessagesCurrent(data.result));
  } catch (e) {
    console.log(e.message);
  }
};

export const fetchMessagesByUserId = (request, token, id) => async (
  dispatch
) => {
  try {
    const data = await request(`/api/messages?user=${id}`, 'GET', null, {
      Authorization: `Bearer ${token}`,
    });
    console.log('messages by user id: ', data);
    dispatch(actions.setMessages(data.result));
  } catch (e) {
    console.log(e.message);
  }
};

export const newMessage = (message) => (dispatch) => {
  dispatch(actions.setMessage(message));
};

export const newMessageCurrent = (message) => (dispatch) => {
  dispatch(actions.setMessageCurrent(message));
};

export const addCurrentDialog = (dialog) => (dispatch) => {
  dispatch(actions.setCurrentDialog(dialog));
};

export const addCurrentContact = (contact) => (dispatch) => {
  dispatch(actions.setSelectedContact(contact));
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
    return data.result;
  } catch (e) {
    console.error(e.message);
    return Promise.reject(e.message);
  }
};

export const fetchCreateDialog = async (request, token, user) => {
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
    return data.result;
  } catch (e) {
    console.error(e.message);
    return Promise.reject(e.message);
  }
};

export const fetchUploadFile = async (
  token,
  file,
  { duration, date, timeEnd }
) => {
  try {
    const response = await fetch(
      `/api/files?duration=${duration}&date=${date}&timeend=${timeEnd}`,
      {
        method: 'POST',
        body: file,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  } catch (e) {
    console.error(e.message);
    return Promise.reject(e.message);
  }
};
