const ID_TOKEN_KEY = "id_token";
const USER_KEY = "user_object";

export const getToken = () => {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};

export const getUser = () => {
  return JSON.parse(window.localStorage.getItem(USER_KEY));
};

export const saveToken = token => {
  window.localStorage.setItem(ID_TOKEN_KEY, token);
};

export const destroyToken = () => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
};

export const saveUser = user => {
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const destroyUser = () => {
  window.localStorage.removeItem(USER_KEY);
};

export default { getToken, getUser, saveToken, saveUser, destroyToken, destroyUser };
