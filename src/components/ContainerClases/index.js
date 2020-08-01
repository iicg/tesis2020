import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { renderClase } from './utils';
import './styles.css';

import useShallowEqualSelector from '../../shared/hooks/useShallowEqualSelector';
import { ReduxService, Firebase } from '../../utils';

export default function ContainerClases() {
  const { session, classes } = useShallowEqualSelector({
    session: ReduxService.session.selectors.active,
    classes: ReduxService.classes.selectors.list,
  });

  useEffect(() => {
    Firebase.classes.getAll();
    Firebase.reservas.getAll();
  }, []);

  return (
    <div className="container-clases-container">
      <h1 className="container-clases-titulo">Clases de Fitness City</h1>
      {session.admin && (
        <Link to="/nuevaclase" className="clases-page-action-container">
          <input type="button" value="Agregar clase" />
        </Link>
      )}
      <div className="container-clases-list-clases">{classes.map(renderClase)}</div>
    </div>
  );
}
