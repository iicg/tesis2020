import React from 'react';

import { useQuery } from 'react-query';
import useShallowEqualSelector from '../../shared/hooks/useShallowEqualSelector';
import { Firebase, ReduxService } from '../../utils';

import './styles.css';

const numberFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'CLP',
});

export default function ContainerPlanes() {
  const { session } = useShallowEqualSelector({
    session: ReduxService.session.selectors.active,
  });
  const { data } = useQuery('todos', Firebase.planes.getTipos);

  const cambioPlan = (tipoPlan) => {
    Firebase.admin.solicitarCambioPlan({
      nombre: session.nombre,
      tipoPlan: session.tipoPlan,
      nuevoTipoPlan: tipoPlan,
    });
  };

  const renderPlan = ([tipoPlan, { precio, color }]) => {
    return (
      <div
        className="container-planes-plan-container"
        style={{
          background: `linear-gradient(180deg, rgba(64,65,66,1) 54%, ${color} 100%)`,
        }}>
        <div className="container-planes-plan-color" style={{ backgroundColor: color }} />
        <div className="container-planes-plan-content">
          <h3 className="container-planes-plan-tipo">Plan {tipoPlan}</h3>
          <h1 className="container-planes-plan-precio">
            {numberFormatter.format(Number(precio))}
            <span className="container-planes-plan-mes">/mes</span>
          </h1>
          {session.tipoPlan === tipoPlan ? (
            <div className="container-planes-mi-plan-container">
              <h3>
                Mi plan <span className="material-icons">done</span>
              </h3>
            </div>
          ) : (
            <div
              onClick={() => cambioPlan(tipoPlan)}
              className="container-planes-solicitar-container">
              <h3>Solicitar cambio a este plan</h3>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container-planes-container">
      <h1 className="container-planes-titulo">PLANES FITNESS CITY</h1>
      <div className="container-planes-content">{data && Object.entries(data).map(renderPlan)}</div>
    </div>
  );
}
