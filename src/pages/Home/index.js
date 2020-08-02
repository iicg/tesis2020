import React, { useEffect, useState } from 'react';

import {
  Sidebar,
  Header,
  ContainerClases,
  ContainerAlumnos,
  ContainerReservas,
} from '../../components';

import './styles.css';

import { ReduxService } from '../../utils';
import useShallowEqualSelector from '../../shared/hooks/useShallowEqualSelector';

export default function HomePage() {
  const session = useShallowEqualSelector(ReduxService.session.selectors.active);
  const [opcion, setOpcion] = useState(0);

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
      default:
        return <ContainerClases />;
    }
  };

  return (
    <div className="home-container">
      <Header />
      <div className="home-body">
        <Sidebar opcion={opcion} admin={session.admin} setOpcion={setOpcion} />
        <div className="home-component-right">{getCurrentScene()}</div>
      </div>
    </div>
  );
}
