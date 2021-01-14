const getOpponent = (users, me) => {
  return users.filter((user) => {
    if (user._id !== me) return user;
    return !user;
  })[0];
};

export default getOpponent;
