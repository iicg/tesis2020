import React, { useMemo } from 'react';

import ReservaItem from '../ReservaItem';

import useShallowEqualSelector from '../../shared/hooks/useShallowEqualSelector';
import { ReduxService, Constants } from '../../utils';
import './styles.css';

export default function ContainerClases() {
  const { session, reservas } = useShallowEqualSelector({
    session: ReduxService.session.selectors.active,
    reservas: ReduxService.reservas.selectors.list,
  });

  const reservasRestantes = useMemo(() => {
    const { tipoPlan } = session;
    if (tipoPlan === 'free') {
      return Constants.RESERVAS_MAX_FREE - reservas.length;
    }
    return Constants.RESERVAS_MAX_PREMIUM - reservas.length;
  }, [reservas.length, session]);

  return (
    <div className="container-reservas-container">
      <h1 className="container-reservas-titulo">MIS RESERVAS</h1>
      <h4 className="container-reservas-subtitulo">{reservasRestantes} reservas restantes</h4>
      <div className="container-reservas-list-reservas">
        {reservas.map((reserva) => (
          <ReservaItem reserva={reserva} />
        ))}
      </div>
    </div>
  );
}
