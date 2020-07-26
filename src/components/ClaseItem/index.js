import React from 'react';
import PropTypes from 'prop-types';

import * as R from 'ramda';

import { Link } from 'react-router-dom';

import './styles.css';

export default function ClaseItem(props) {
  const { clase } = props;

  return (
    <div className="clase-item-container">
      <Link className="clase-item-link" to={`/clase/${clase.uid}`}>
        <div className="clase-item-nombre-container">
          <h3 className="clase-item-nombre">{clase.nombre}</h3>
        </div>
        <h5 className="clase-item-duracion">{clase.duracion} horas</h5>
        <p className="clase-item-descripcion">{clase.descripcion}</p>
        <h5 className="clase-item-inscritos">
          {R.propOr([], 'alumnos', clase).length} alumnos inscritos
        </h5>
      </Link>
    </div>
  );
}

ClaseItem.propTypes = {
  clase: PropTypes.object.isRequired,
};
