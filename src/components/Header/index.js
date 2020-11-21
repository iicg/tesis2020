import React from 'react';
import { Link } from 'react-router-dom';

import { ReduxService } from '../../utils';
import { signOut } from '../../utils/firebase/session';
import useShallowEqualSelector from '../../shared/hooks/useShallowEqualSelector';

import logo from '../../img/logo.png';
import avatar from '../../img/avatar.png';
import './styles.css';

export default function Header() {
  const session = useShallowEqualSelector(ReduxService.session.selectors.active);
  const { nombre } = session;
  return (
    <header className="header-container">
      <Link to="/home" className="header-left">
        <img src={logo} alt="FitnessCity" />
      </Link>
      <div className="header-middle" />
      <Link to="/perfil" className="header-right">
        <img src={avatar} alt="Perfil" className="header-avatar" />
        <div className="header-perfil">Mi perfil</div>
      </Link>
    </header>
  );
}
