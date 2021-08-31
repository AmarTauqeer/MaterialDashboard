import { ActionTypes } from "../constants/actionTypes";

// fetch users

export const fetchUsers = (users) => {
  return {
    type: ActionTypes.FETCH_USERS,
    payload: users,
  };
};

// add user
export const addUser = (user) => {
  return {
    type: ActionTypes.ADD_USER,
    payload: user,
  };
};

// selected user
export const selectedUser = (user) => {
  return {
    type: ActionTypes.SELECTED_USER,
    payload: user,
  };
};

// remove selected user
export const removeSelectedUser = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_USER,
  };
};
