import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { createLogger } from 'redux-logger';
import rootReducer from './root-reducer';

const middlewares = [];

middlewares.push(createLogger());

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, undefined, applyMiddleware(...middlewares));
export const persistor = persistStore(store);
