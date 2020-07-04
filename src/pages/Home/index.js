import React, { useCallback, useEffect } from 'react';

import { ReduxService, Firebase } from '../../utils';
import useShallowEqualSelector from '../../shared/hooks/useShallowEqualSelector';

import './styles.css';

export default function HomePage() {
  const session = useShallowEqualSelector(ReduxService.session.selectors.active);

  useEffect(() => {
    if (!session.authenticated) {
      window.location.replace('/');
    }
  }, [session]);

  const signOut = useCallback(() => Firebase.session.signOut(), []);

  return (
    <div className="home-page-container">
      <h1>Pagina de inicio</h1>
      <h4>Email: {session.email}</h4>
      <button type="button" onClick={signOut}>
        Cerrar sesion
      </button>
    </div>
  );
}
