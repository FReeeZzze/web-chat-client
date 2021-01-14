const fetchAuth = async (request, form, showMessage, auth) => {
  try {
    const data = await request('/api/auth/login', 'POST', form);
    showMessage(data.message, data.status);
    auth.login(data.token, data.userId);
  } catch (e) {
    showMessage(e.message);
  }
};

export default fetchAuth;
