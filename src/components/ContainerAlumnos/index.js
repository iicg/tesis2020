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
      <div className="clase-page-action-container">
        <input type="button" value="Agregar alumno" />
      </div>
      <div className="container-clases-list-alumnos">{alumnos.map(renderAlumno)}</div>
    </div>
  );
}
