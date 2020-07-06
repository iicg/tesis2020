import React, { useEffect } from 'react';

import { renderAlumno } from './utils';
import './styles.css';

import useShallowEqualSelector from '../../shared/hooks/useShallowEqualSelector';
import { ReduxService, Firebase } from '../../utils';

export default function ContainerAlumnos() {
  const alumnos = useShallowEqualSelector(ReduxService.users.selectors.list);

  useEffect(() => {
    Firebase.users.getAll();
  }, []);

  return (
    <div className="container-clases-container">
      <h1 className="container-clases-titulo">Alumnos de Fitness City</h1>
      <ul>{alumnos.map(renderAlumno)}</ul>
    </div>
  );
}
