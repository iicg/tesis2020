import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { Firebase } from '../../utils';

import './styles.css';

export default function ReservaItem(props) {
  const { reserva } = props;
  // reserva: nombreClase, fechaReserva (tipo fecha), idClase

  const onPressDelete = useCallback(() => {
    Firebase.reservas.delete(reserva.uid);
  }, [reserva]);

  return (
    <div>
      <h4>{reserva.nombreClase}</h4>
      <input type="button" value="Borrar reserva" onClick={onPressDelete} />
    </div>
  );
}

ReservaItem.propTypes = {
  reserva: PropTypes.object.isRequired,
};
