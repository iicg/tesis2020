import { combineReducers } from 'redux';
import sessionReducer from './session/reducer';

const appReducer = combineReducers({
  session: sessionReducer,
});

export default function rootReducer(state, action) {
  return appReducer(state, action);
}
