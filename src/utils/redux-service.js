import reduxActions from '../redux';

let Store;

function setStore(storeRef) {
  Store = storeRef;
}

function getState() {
  return Store.getState();
}

function dispatch(action) {
  Store.dispatch(action);
}

export default {
  dispatch,
  getState,
  setStore,
  ...reduxActions,
};
