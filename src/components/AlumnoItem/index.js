import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Firebase } from '../../utils';

import './styles.css';

export default function AlumnoItem(props) {
  const { alumno } = props;
  const [loading, setLoading] = useState(false);

  const blockUser = useCallback(() => {
    setLoading(true);
    try {
      if (alumno.bloqueado) Firebase.admin.unblockUser(alumno.uid);
      else Firebase.admin.blockUser(alumno.uid);
    } catch (e) {
      alert(e);
      setLoading(false);
    }
  }, [alumno]);

  useEffect(() => {
    setLoading(false);
  }, [alumno]);

  return (
    <div className="alumno-item-container">
      <h3 className="alumno-item-nombre">
        {alumno.nombre} {alumno.apellido}
      </h3>
      <p className="alumno-item-descripcion">Rut: {alumno.rut}</p>
      <h5 className="alumno-item-descripcion">Tipo de plan: {alumno.tipoPlan}</h5>
      <div className="alumno-item-acciones">
        <div className="bloqueo-alumno">
          <input
            disabled={loading}
            onClick={blockUser}
            type="button"
            // eslint-disable-next-line no-nested-ternary
            value={loading ? 'Cargando' : alumno.bloqueado ? 'Desbloquear' : 'Bloquear'}
            style={{ backgroundColor: alumno.bloqueado ? '#17ad35' : '#de3914' }}
          />
        </div>
        <div className="editar-alumno">
          <input type="button" value="Editar" />
        </div>
      </div>
    </div>
  );
}

AlumnoItem.propTypes = {
  alumno: PropTypes.object.isRequired,
};
