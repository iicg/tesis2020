import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from './root-reducer';

const middlewares = [];

middlewares.push(createLogger());

export default function configureStore(persistedState) {
  const store = createStore(rootReducer, persistedState, applyMiddleware(...middlewares));
  return store;
}
