import React, { useEffect } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './redux/configure-store';

import Navigator from './navigator';

import { ReduxService, Firebase } from './utils';
import { LoadingPage } from './pages';

function App() {
  useEffect(() => {
    ReduxService.setStore(store);
    Firebase.session.setupListeners();
  }, []);

  return (
    <StoreProvider store={store}>
      <PersistGate loading={<LoadingPage />} persistor={persistor}>
        <Navigator />
      </PersistGate>
    </StoreProvider>
  );
}

export default App;
