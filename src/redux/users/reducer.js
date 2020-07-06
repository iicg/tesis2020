import * as R from 'ramda';
import { PURGE } from 'redux-persist';

import { SET_USERS, CLEAR_USERS, ADD_USER, REMOVE_USER, MODIFY_USER } from './constants';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return R.uniqBy(R.prop('id'), [...state, action.payload]);
    case CLEAR_USERS:
      return initialState;
    case MODIFY_USER:
      return state.map((clase) => (clase.id === action.payload.id ? action.payload : clase));
    case REMOVE_USER:
      return state.filter((clase) => clase.id !== action.payload);
    case SET_USERS:
      return action.payload;
    case PURGE:
      return initialState;
    default:
      return state;
  }
};
