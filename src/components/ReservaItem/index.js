import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { Firebase } from '../../utils';

import './styles.css';

export default function ReservaItem(props) {
  const { reserva } = props;
  // reserva: nombreClase, fechaReserva (tipo fecha), idClase

  const onPressDelete = useCallback(async () => {
    Firebase.reservas.delete(reserva).then(() => alert('Reserva eliminada con exito.'));
  }, [reserva]);

  return (
    <div className="reserva-item-container">
      <h4 className="reserva-item-nombre">{reserva.nombreClase}</h4>
      <div className="reserva-item-acciones">
        <div className="borrar-reserva">
          <input type="button" value="Borrar reserva" onClick={onPressDelete} />
        </div>
      </div>
    </div>
  );
}
