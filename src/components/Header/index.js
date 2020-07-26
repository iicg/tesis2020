import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import useShallowEqualSelector from '../../shared/hooks/useShallowEqualSelector';

import logo from '../../img/logo.png';
import { ReduxService } from '../../utils';
import { signOut } from '../../utils/firebase/session';

export default function Header() {
  const session = useShallowEqualSelector(ReduxService.session.selectors.active);
  const { nombre } = session;
  return (
    <header className="header-container">
      <Link to="/home" className="header-left">
        <img src={logo} alt="FitnessCity" />
      </Link>
      <div className="header-middle" />
      <div className="header-right">
        <h4 onClick={signOut} className="header-nombre">
          {nombre} [cerrar sesion]
        </h4>
      </div>
    </header>
  );
}
