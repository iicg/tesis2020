import React, { useEffect, useState } from 'react';

import { Sidebar, Header, ContainerClases, ContainerAlumnos } from '../../components';

import './styles.css';

import { ReduxService, Firebase } from '../../utils';
import useShallowEqualSelector from '../../shared/hooks/useShallowEqualSelector';

export default function HomePage() {
  const session = useShallowEqualSelector(ReduxService.session.selectors.active);
  const [opcion, setOpcion] = useState(0);

  useEffect(() => {
    if (!session.authenticated) {
      window.location.replace('/');
    }
  }, [session]);

  const signOut = () => {
    Firebase.session.signOut();
  };

  return (
    <div>
      <Header signOut={signOut} nombre={`${session.nombre} ${session.apellido}`} />
      <div className="home-body">
        <Sidebar admin={session.admin} setOpcion={setOpcion} />
        <div className="home-component-right">
          {opcion === 0 ? <ContainerClases /> : <ContainerAlumnos />}
        </div>
      </div>
    </div>
  );
}
