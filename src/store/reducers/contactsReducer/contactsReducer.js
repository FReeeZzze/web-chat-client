export const types = {
  SET_SELECTED_CONTACT: 'contacts/SET_SELECTED_CONTACT',
  SET_ME: 'contacts/SET_ME',
  SET_SEARCH_USER: 'contacts/SET_SEARCH_USER',
  SET_MESSAGES: 'contacts/SET_MESSAGES',
  SET_MESSAGE: 'contacts/SET_MESSAGE',
  SET_MESSAGES_CURRENT: 'contacts/SET_MESSAGES_CURRENT',
  SET_MESSAGE_CURRENT: 'contacts/SET_MESSAGE_CURRENT',
  ADD_CONTACT: 'contacts/ADD_CONTACT',
  SET_CONTACTS: 'contacts/SET_CONTACTS',
  SET_CURRENT_DIALOG: 'contacts/SET_CURRENT_DIALOG',
};

const init = {
  me: {},
  contacts: [],
  currentDialog: {
    messages: [],
    users: [],
  },
  messages: [],
  selectedContact: {},
};

export default function contactsReducer(state = init, action) {
  const { type, payload } = action;
  switch (type) {
    case types.SET_CONTACTS: {
      return { ...state, contacts: payload };
    }
    case types.SET_CURRENT_DIALOG:
      return { ...state, currentDialog: payload };
    case types.SET_SELECTED_CONTACT:
      return { ...state, selectedContact: payload };
    case types.ADD_CONTACT:
      return { ...state, contacts: [...state.contacts, payload] };
    case types.SET_ME:
      return { ...state, me: payload };
    case types.SET_MESSAGES:
      return { ...state, messages: payload };
    case types.SET_MESSAGE:
      return { ...state, messages: [...state.messages, payload] };
    case types.SET_MESSAGES_CURRENT:
      return {
        ...state,
        currentDialog: { ...state.currentDialog, messages: payload },
      };
    case types.SET_MESSAGE_CURRENT:
      return {
        ...state,
        currentDialog: {
          ...state.currentDialog,
          messages: [...state.currentDialog.messages, payload],
        },
      };
    default:
      return state;
  }
}

export const actions = {
  setMe: (me) => ({
    type: types.SET_ME,
    payload: me,
  }),
  setCurrentDialog: (dialog) => ({
    type: types.SET_CURRENT_DIALOG,
    payload: dialog,
  }),
  setContacts: (contacts) => ({
    type: types.SET_CONTACTS,
    payload: contacts,
  }),
  addContact: (contact) => ({
    type: types.ADD_CONTACT,
    payload: contact,
  }),
  setSelectedContact: (user) => ({
    type: types.SET_SELECTED_CONTACT,
    payload: user,
  }),
  setMessagesCurrent: (messages) => ({
    type: types.SET_MESSAGES_CURRENT,
    payload: messages,
  }),
  setMessage: (message) => ({
    type: types.SET_MESSAGE,
    payload: message,
  }),
  setMessageCurrent: (message) => ({
    type: types.SET_MESSAGE_CURRENT,
    payload: message,
  }),
  setMessages: (messages) => ({
    type: types.SET_MESSAGES,
    payload: messages,
  }),
};
