import React, { useEffect, useState } from 'react';

import {
  Sidebar,
  Header,
  ContainerClases,
  ContainerAlumnos,
  ContainerReservas,
  ContainerPlanes,
  ContainerCalendario,
  ContainerReportes,
} from '../../components';

import './styles.css';

import { Firebase, ReduxService } from '../../utils';
import useShallowEqualSelector from '../../shared/hooks/useShallowEqualSelector';

export default function HomePage() {
  const session = useShallowEqualSelector(ReduxService.session.selectors.active);
  const [opcion, setOpcion] = useState(5);

  useEffect(() => {
    if (!session.authenticated) {
      window.location.replace('/');
    }
  }, [session]);

  const getCurrentScene = () => {
    switch (opcion) {
      case 0:
        return <ContainerClases />;
      case 1:
        return <ContainerAlumnos />;
      case 2:
        return <ContainerReservas />;
      case 3:
        return <ContainerCalendario />;
      case 4:
        return <ContainerPlanes />;
      case 5:
        return <ContainerReportes />;
      default:
        return <ContainerClases />;
    }
  };

  return (
    <div className="home-container">
      <Header />
      <div className="home-body">
        <Sidebar
          admin={session.admin}
          opcion={opcion}
          salir={Firebase.session.signOut}
          setOpcion={setOpcion}
        />
        <div className="home-component-right">{getCurrentScene()}</div>
      </div>
    </div>
  );
}
