import { combineReducers } from 'redux';
import sessionReducer from './session/reducer';
import classesReducer from './classes/reducer';
import usersReducer from './users/reducer';

const appReducer = combineReducers({
  session: sessionReducer,
  classes: classesReducer,
  users: usersReducer,
});

export default function rootReducer(state, action) {
  return appReducer(state, action);
}
