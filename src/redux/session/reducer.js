import { CLEAR_SESSION, SET_SESSION, UPDATE_SESSION } from './constants';

const initialState = {
  authenticated: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_SESSION:
      return initialState;
    case SET_SESSION:
      return { ...action.payload, authenticated: true };
    case UPDATE_SESSION:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
