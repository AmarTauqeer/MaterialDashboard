import { combineReducers } from "redux";
import { UserReducer } from "./UserReducer";
import { MessageReducer } from "./MessageReducer";
import { CategoryReducer } from "./CategoryReducer";

export const reducers = combineReducers({
  allUsers: UserReducer,
  messages: MessageReducer,
  allCategories: CategoryReducer,
});
