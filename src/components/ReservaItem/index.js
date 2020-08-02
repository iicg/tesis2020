import React from 'react';

import './styles.css';

export default function ReservaItem(props) {
  const { reserva } = props;
  // reserva: nombreClase, fechaReserva (tipo fecha), idClase

  return <div>{reserva.nombreClase}</div>;
}
