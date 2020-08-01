import React from 'react';

import './styles.css';
import useShallowEqualSelector from '../../shared/hooks/useShallowEqualSelector';

import { ReduxService } from '../../utils';
import { Header } from '../../components';

export default function Perfil() {
  const session = useShallowEqualSelector(ReduxService.session.selectors.active);
  const { nombre } = session;
  const { apellido } = session;
  const { fechaIngreso } = session;
  const { tipoPlan } = session;
  const { email } = session;

  return (
    <div className="perfil-container">
      <Header />
      <div className="perfil-page-content">
        <div>
          <h3 className="perfil-page-title">{nombre}</h3>
          <h3 className="clase-page-title">{apellido}</h3>
        </div>
        <h4 className="clase-page-title">{email}</h4>
        <h5 className="clase-page-title">{fechaIngreso}</h5>
        <h5 className="clase-page-title">{tipoPlan}</h5>
      </div>
    </div>
  );
}
