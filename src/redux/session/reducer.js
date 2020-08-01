import { PURGE } from 'redux-persist';
import { CLEAR_SESSION, SET_SESSION, UPDATE_SESSION } from './constants';

const initialState = {
  authenticated: false,
  toastMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_SESSION:
      return initialState;
    case SET_SESSION:
      return { ...action.payload, authenticated: true };
    case UPDATE_SESSION:
      return { ...state, ...action.payload };
    case PURGE:
      return initialState;
    default:
      return state;
  }
};
