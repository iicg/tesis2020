import React from 'react';

import './styles.css';

import useShallowEqualSelector from '../../shared/hooks/useShallowEqualSelector';
import { ReduxService } from '../../utils';
import ReservaItem from '../ReservaItem';

export default function ContainerClases() {
  const reservas = useShallowEqualSelector(ReduxService.reservas.selectors.list);

  return (
    <div className="container-reservas-container">
      <h1 className="container-reservas-titulo">MIS RESERVAS</h1>
      <div className="container-reservas-list-reservas">
        {reservas.map((reserva) => (
          <ReservaItem reserva={reserva} />
        ))}
      </div>
    </div>
  );
}
