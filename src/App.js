import React, { useEffect } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import configureStore from './redux/configure-store';

import Navigator from './navigator';

import { ReduxService, Firebase } from './utils';

const store = configureStore();

function App() {
  useEffect(() => {
    ReduxService.setStore(store);
    Firebase.session.setupListeners();
  }, []);

  return (
    <StoreProvider store={store}>
      <Navigator />
    </StoreProvider>
  );
}

export default App;
