import * as R from 'ramda';
import { PURGE } from 'redux-persist';

import { SET_CLASSES, CLEAR_CLASSES, ADD_CLASS, REMOVE_CLASS, MODIFY_CLASS } from './constants';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CLASS:
      return R.uniqBy(R.prop('id'), [...state, action.payload]);
    case CLEAR_CLASSES:
      return initialState;
    case MODIFY_CLASS:
      return state.map((clase) => (clase.id === action.payload.id ? action.payload : clase));
    case REMOVE_CLASS:
      return state.filter((clase) => clase.id !== action.payload);
    case SET_CLASSES:
      return action.payload;
    case PURGE:
      return initialState;
    default:
      return state;
  }
};
