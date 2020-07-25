import React from 'react';
import * as R from 'ramda';

import { Link } from 'react-router-dom';

import './styles.css';

export default function ClaseItem(props) {
  const { clase } = props;

  return (
    <li className="clase-item-container">
      <Link to={`/clase/${clase.id}`}>
        <h3 className="clase-item-nombre">{clase.nombre}</h3>
        <p className="clase-item-descripcion">{clase.descripcion}</p>
        <h5 className="clase-item-descripcion">{clase.duracion} horas</h5>
        <h5 className="clase-item-inscritos">
          {R.propOr([], 'alumnos', clase).length} alumnos inscritos
        </h5>
      </Link>
    </li>
  );
}
