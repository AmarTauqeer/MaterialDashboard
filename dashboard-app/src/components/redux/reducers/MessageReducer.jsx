import { ActionTypes } from "../constants/actionTypes";

// initial state
const initialState = {
  messages: [
    {
      open: false,
      messageType: "",
      message: "",
    },
  ],
};

export const MessageReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_MESSAGE:
      return { ...state, messages: payload };

    case ActionTypes.REMOVE_MESSAGE:
      return initialState;

    default:
      return state;
  }
};
