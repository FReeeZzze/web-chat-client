export const types = {
  SET_SELECTED_CONTACT: 'contacts/SET_SELECTED_CONTACT',
  SET_SEARCH_CONTACTS: 'contacts/SET_SEARCH_CONTACTS',
  SET_ME: 'contacts/SET_ME',
  SET_SEARCH_USER: 'contacts/SET_SEARCH_USER',
  SET_MESSAGE: 'contacts/SET_MESSAGE',
  SET_MESSAGES: 'contacts/SET_MESSAGES',
  CLEAR_SEARCH_CONTACTS: 'contacts/CLEAR_SEARCH_CONTACTS',
  ADD_CONTACT: 'contacts/ADD_CONTACT',
  SET_CONTACTS: 'contacts/SET_CONTACTS',
  SET_CURRENT_DIALOG: 'contacts/SET_CURRENT_DIALOG',
};

const init = {
  me: {},
  searchContacts: [],
  contacts: [],
  currentDialog: {
    messages: [],
  },
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
    case types.SET_SEARCH_CONTACTS:
      return { ...state, searchContacts: payload };
    case types.CLEAR_SEARCH_CONTACTS:
      return { ...state, searchContacts: payload };
    case types.SET_MESSAGES:
      return {
        ...state,
        currentDialog: { ...state.currentDialog, messages: payload },
      };
    case types.SET_MESSAGE:
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
  clearSearchContacts: () => ({
    type: types.CLEAR_SEARCH_CONTACTS,
    payload: [],
  }),
  setSearchContacts: (users) => ({
    type: types.SET_SEARCH_CONTACTS,
    payload: users,
  }),
  setSelectedContact: (user) => ({
    type: types.SET_SELECTED_CONTACT,
    payload: user,
  }),
  setMessage: (message) => ({
    type: types.SET_MESSAGE,
    payload: message,
  }),
  setMessages: (messages) => ({
    type: types.SET_MESSAGES,
    payload: messages,
  }),
};
