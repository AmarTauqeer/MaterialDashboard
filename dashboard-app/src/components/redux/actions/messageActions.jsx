import { ActionTypes } from "../constants/actionTypes";
// set messages

export const setMessage = (message) => {
  return {
    type: ActionTypes.SET_MESSAGE,
    payload: message,
  };
};

// remove selected user
export const removeMessage = () => {
  return {
    type: ActionTypes.REMOVE_MESSAGE,
  };
};
