import React from 'react';
import './styles.css';

import logo from '../../img/logo.png';

export default function Header(props) {
  const { nombre, rut, signOut } = props;
  return (
    <header className="header-container">
      <div className="header-left">
        <img src={logo} alt="FitnessCity" />
      </div>
      <div className="header-middle" />
      <div className="header-right">
        <h4 onClick={signOut} className="header-nombre">
          {nombre} [cerrar sesion]
        </h4>
        <h4 onClick={signOut} className="header-nombre">
          {rut}
        </h4>
      </div>
    </header>
  );
}
