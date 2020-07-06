import { SET_USERS, CLEAR_USERS, ADD_USER, REMOVE_USER, MODIFY_USER } from './constants';

export function add(contact) {
  return {
    type: ADD_USER,
    payload: contact,
  };
}

export function clear() {
  return {
    type: CLEAR_USERS,
  };
}

export function modify(contact) {
  return {
    type: MODIFY_USER,
    payload: contact,
  };
}

export function remove(id) {
  return {
    type: REMOVE_USER,
    payload: id,
  };
}

export function set(payload) {
  return {
    type: SET_USERS,
    payload,
  };
}
