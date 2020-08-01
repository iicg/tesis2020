import {
  SET_RESERVAS,
  CLEAR_RESERVAS,
  ADD_RESERVA,
  REMOVE_RESERVA,
  MODIFY_RESERVA,
} from './constants';

export function add(reserva) {
  return {
    type: ADD_RESERVA,
    payload: reserva,
  };
}

export function clear() {
  return {
    type: CLEAR_RESERVAS,
  };
}

export function modify(reserva) {
  return {
    type: MODIFY_RESERVA,
    payload: reserva,
  };
}

export function remove(id) {
  return {
    type: REMOVE_RESERVA,
    payload: id,
  };
}

export function set(payload) {
  return {
    type: SET_RESERVAS,
    payload,
  };
}
