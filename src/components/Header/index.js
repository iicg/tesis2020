import React from 'react';
import './styles.css';

import logo from '../../img/logo.png';

export default function Header(props) {
  const { nombre, signOut } = props;
  return (
    <header className="header-container">
      <div className="header-left">
        <img src={logo} alt="FitnessCity" />
      </div>
      <div className="header-middle" />
      <div className="header-right">
        <h4 onClick={signOut} className="header-nombre">
          {nombre}
        </h4>
      </div>
    </header>
  );
}
