import * as R from 'ramda';
import { PURGE } from 'redux-persist';

import {
  SET_RESERVAS,
  CLEAR_RESERVAS,
  ADD_RESERVA,
  REMOVE_RESERVA,
  MODIFY_RESERVA,
} from './constants';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_RESERVA:
      return [...state, action.payload];
    case CLEAR_RESERVAS:
      return initialState;
    case MODIFY_RESERVA:
      return state.map((reserva) => (reserva.id === action.payload.id ? action.payload : reserva));
    case REMOVE_RESERVA:
      return state.filter((reserva) => reserva.uid !== action.payload);
    case SET_RESERVAS:
      return action.payload;
    case PURGE:
      return initialState;
    default:
      return state;
  }
};
