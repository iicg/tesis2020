import { CLEAR_SESSION, SET_SESSION, UPDATE_SESSION } from './constants';

export function clear() {
  return {
    type: CLEAR_SESSION,
  };
}

export function set(payload) {
  return {
    type: SET_SESSION,
    payload,
  };
}

export function update(payload) {
  return {
    type: UPDATE_SESSION,
    payload,
  };
}
