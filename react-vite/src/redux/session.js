import { clearActivities } from "./activities";
import { csrfFetch } from "./csrf";
import { clearEntries } from "./entries";
import { clearLevels } from "./levels";

const SET_CURRENT_USER = "/store/session/SET_CURRENT_USER";
const REMOVE_USER = "/store/session/REMOVE_USER";

// * Actions
const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

// * Thunks

// Login
export const login = (user) => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify(user),
  });
  const data = await response.json();
  dispatch(setCurrentUser(data));
  return data;
};

// Restore User
export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const user = await response.json();
  dispatch(setCurrentUser(user));
  return response;
};

// Signup
export const signup = (payload) => async (dispatch) => {
  console.log("in thunk for sign up", payload);

  const response = await csrfFetch("/api/users", {
    method: "post",
    body: JSON.stringify(payload),
  });

  const user = await response.json();
  console.log("user", user);
  dispatch(setCurrentUser(user));
  return user;
};

//Logout
export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "delete",
  });
  dispatch(removeUser());
  dispatch(clearEntries());
  dispatch(clearActivities());
  dispatch(clearLevels());
  return response;
};

// * Reducer
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER: {
      return { ...state, ...action.user };
    }
    case REMOVE_USER: {
      return { ...state, user: null };
    }
    default:
      return state;
  }
};

export default sessionReducer;
