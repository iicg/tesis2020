import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import useShallowEqualSelector from '../../shared/hooks/useShallowEqualSelector';

import { ReduxService } from '../../utils';
import { Header } from '../../components';

export default function Perfil() {
  const session = useShallowEqualSelector(ReduxService.session.selectors.active);
  const { nombre, apellido, tipoPlan, email } = session;

  return (
    <div className="perfil-container">
      <Header />
      <Link to="/home">
        <button className="atras">volver</button>
      </Link>
      <div className="perfil-page-content">
        <div className="perfil-nombre">
          <h1 className="perfil-page-title">{nombre}</h1>
          <h1 className="perfil-page-title">{apellido}</h1>
        </div>
        <h4 className="perfil-page-title">email: {email}</h4>
        <h5 className="perfil-page-title">tipo de plan: {tipoPlan}</h5>
      </div>
    </div>
  );
}
