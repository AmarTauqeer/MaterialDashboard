import { ActionTypes } from "../constants/actionTypes";

// initial state
const initialState = {
  users: [],
};

export const UserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.FETCH_USERS:
      return { ...state, users: [...state, payload] };

    case ActionTypes.SELECTED_USER:
      return { ...state, users: payload };

    case ActionTypes.REMOVE_SELECTED_USER:
      return initialState;

    case ActionTypes.ADD_USER: {
      return { ...state, users: [...state.users, payload] };
    }

    default:
      return state;
  }
};
