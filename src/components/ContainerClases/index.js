import React, { useEffect } from 'react';

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
  }, []);

  return (
    <div className="container-clases-container">
      <h1 className="container-clases-titulo">Clases de Fitness City</h1>
      {session.admin && (
        <div className="clase-page-action-container">
          <input type="button" value="Agregar clase" />
        </div>
      )}
      <ul dir="horizontal">{classes.map(renderClase)}</ul>
    </div>
  );
}
