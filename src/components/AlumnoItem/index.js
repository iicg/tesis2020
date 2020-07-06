import React from 'react';

import './styles.css';

export default function AlumnoItem(props) {
  const { alumno } = props;

  return (
    <li className="alumno-item-container">
      <h3 className="alumno-item-nombre">
        {alumno.nombre} {alumno.apellido}
      </h3>
      <p className="alumno-item-descripcion">Rut: {alumno.rut}</p>
      <h5 className="alumno-item-descripcion">Tipo de plan: {alumno.tipoPlan}</h5>
    </li>
  );
}
