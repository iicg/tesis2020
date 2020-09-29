import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';

import { Header } from '../../components';

import useShallowEqualSelector from '../../shared/hooks/useShallowEqualSelector';
import { ReduxService, Firebase, Constants } from '../../utils';

import './styles.css';

export default function ClasePage() {
  const { uid } = useParams();
  const { session, classes, reservas } = useShallowEqualSelector({
    session: ReduxService.session.selectors.active,
    classes: ReduxService.classes.selectors.list,
    reservas: ReduxService.reservas.selectors.list,
  });

  const [claseActiva, setClaseActiva] = useState({});
  const [reservado, setReservado] = useState(false);

  useEffect(() => {
    if (uid) {
      const clase = classes.filter((c) => c.uid === uid)[0];
      if (clase) {
        setClaseActiva(clase);
        const reservasFiltradas = reservas.filter((reserva) => reserva.idClase === claseActiva.uid);
        setReservado(Boolean(reservasFiltradas.length));
      } else {
        window.location.replace('/');
      }
    }
  }, [claseActiva.uid, classes, reservas, uid]);

  const eliminarClase = useCallback(() => {
    const result = window.confirm('¿De verdad quieres eliminar esta clase?');
    if (result) {
      Firebase.classes.delete(claseActiva.uid);
    }
  }, [claseActiva]);

  const reservasRestantes = useMemo(() => {
    const { tipoPlan } = session;
    if (tipoPlan === 'free') {
      return Constants.RESERVAS_MAX_FREE - reservas.length;
    }
    return Constants.RESERVAS_MAX_PREMIUM - reservas.length;
  }, [reservas.length, session]);

  const reservarClase = useCallback(async () => {
    if (reservasRestantes > 0) {
      setReservado(true);
      Firebase.reservas
        .create(claseActiva)
        .catch(() =>
          ReduxService.dispatch(
            ReduxService.session.actions.update({ toastMessage: 'Ha ocurrido un error' }),
          ),
        );
    } else {
      alert('Has alcanzado el limite de reservas de tu plan.');
    }
  }, [claseActiva, reservasRestantes]);

  return (
    <div className="clase-page-container">
      <Header />
      <div className="clase-page-content">
        <Link to="/home">
          <button type="button" className="main-back-button">
            <span className="material-icons">arrow_back</span>
          </button>
        </Link>
        <h1 className="clase-page-title">{claseActiva.nombre}</h1>
        {session.admin && (
          <div className="clase-page-action-container">
            <Link className="editar-clase-link" to={`/editarclase/${claseActiva.uid}`}>
              <input className="clase-page-editar" type="button" value="Editar clase" />
            </Link>
            <input
              onClick={eliminarClase}
              className="clase-page-eliminar"
              type="button"
              value="Eliminar clase"
            />
            <input
              onClick={reservarClase}
              disabled={reservado}
              className={`${reservado && 'clase-page-reservar-disabled'} clase-page-reservar`}
              type="button"
              value={reservado ? 'Clase reservada' : 'Reservar clase'}
            />
          </div>
        )}
        <p className="clase-page-description">{claseActiva.descripcion}</p>
      </div>
    </div>
  );
}
