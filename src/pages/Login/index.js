import React, { useCallback, useState, useEffect } from 'react';

import './styles.css';

import { useHistory } from 'react-router-dom';
import loginFondo from '../../img/fondoLogin.jpg';
import logo from '../../img/logo.png';

import { Firebase, ReduxService } from '../../utils';
import useShallowEqualSelector from '../../shared/hooks/useShallowEqualSelector';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const session = useShallowEqualSelector(ReduxService.session.selectors.active);

  const history = useHistory();

  useEffect(() => {
    if (session.authenticated) {
      history.push('/home');
    }
  }, [session, history]);

  const onPressLogin = useCallback(() => {
    Firebase.session.signIn(email, password);
  }, [email, password]);

  return (
    <div className="login-container">

      <div className="login-left">
        <div className="login-left-logo">
          <img src={logo} alt="FitnessCity" />
        </div>
        <div className='login-left-container'>
          <div className='login-left-center'>
            <div className='login-title'>
              <h1>INGRESA A FITNESS CITY</h1>
            </div>
            <div className='login-input'>
              <h4>Email</h4>
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="ejemplo@email.com"
                required
              />
            </div>
            <div className='login-input'>
              <h4>Constraseña</h4>
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
            <input
              className="login-button-sesion"
              type="submit"
              value="Iniciar sesion"
              onClick={onPressLogin}
            />
          </div>
        </div>
        <div className='login-left-footer'></div>
      </div>

      <div className="login-right">
        <img src={loginFondo} alt="crossfit" />
      </div>

    </div>
  );
}
