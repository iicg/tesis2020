import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { Header } from '../../components';

import useShallowEqualSelector from '../../shared/hooks/useShallowEqualSelector';
import { ReduxService, Firebase } from '../../utils';

import './styles.css';

export default function ClasePage() {
  const { id } = useParams();
  const { session, classes } = useShallowEqualSelector({
    session: ReduxService.session.selectors.active,
    classes: ReduxService.classes.selectors.list,
  });

  const [claseActiva, setClaseActiva] = useState({});

  useEffect(() => {
    if (id) {
      const clase = classes.filter((c) => c.id === id)[0];
      if (clase) {
        setClaseActiva(clase);
      } else {
        window.location.replace('/');
      }
    }
  }, [id, classes]);

  const eliminarClase = useCallback(() => {
    const result = window.confirm('¿De verdad quieres eliminar esta clase?');
    if (result) {
      Firebase.classes.delete(claseActiva.id);
    }
  }, [claseActiva]);

  return (
    <div className="clase-page-container">
      <Header />
      <div className="clase-page-content">
        <h1 className="clase-page-title">{claseActiva.nombre}</h1>
        {session.admin && (
          <div className="clase-page-action-container">
            <input type="button" value="Editar clase" />
            <input
              onClick={eliminarClase}
              className="clase-page-eliminar"
              type="button"
              value="Eliminar clase"
            />
          </div>
        )}
        <p className="clase-page-description">{claseActiva.descripcion}</p>
      </div>
    </div>
  );
}
