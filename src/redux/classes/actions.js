import { SET_CLASSES, CLEAR_CLASSES, ADD_CLASS, REMOVE_CLASS, MODIFY_CLASS } from './constants';

export function add(contact) {
  return {
    type: ADD_CLASS,
    payload: contact,
  };
}

export function clear() {
  return {
    type: CLEAR_CLASSES,
  };
}

export function modify(contact) {
  return {
    type: MODIFY_CLASS,
    payload: contact,
  };
}

export function remove(id) {
  return {
    type: REMOVE_CLASS,
    payload: id,
  };
}

export function set(payload) {
  return {
    type: SET_CLASSES,
    payload,
  };
}
