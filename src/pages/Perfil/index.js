import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import useShallowEqualSelector from '../../shared/hooks/useShallowEqualSelector';

import { ReduxService } from '../../utils';
import { Header } from '../../components';

export default function Perfil() {
  const session = useShallowEqualSelector(ReduxService.session.selectors.active);
  const { nombre, rut, apellido, tipoPlan, email } = session;

  return (
    <div className="perfil-container">
      <Header />
      <div className="perfil-page-content">
        <Link to="/home">
          <button type="button" className="main-back-button">
            <span className="material-icons">arrow_back</span>
          </button>
        </Link>
        <div className="perfil-nombre">
          <h1 className="perfil-page-title">{nombre}</h1>
          <h1 className="perfil-page-title">{apellido}</h1>
        </div>
        <h3 className="perfil-page-title">{rut}</h3>
        <h4 className="perfil-page-title">email: {email}</h4>
        <h5 className="perfil-page-title">tipo de plan: {tipoPlan}</h5>
      </div>
    </div>
  );
}
