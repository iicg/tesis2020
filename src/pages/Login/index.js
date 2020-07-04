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
        <div className="login-left-container">
          <div className="login-left-header">
            <img src={logo} alt="FitnessCity" />
          </div>
          <h1 className="login-title">INGRESA A FITNESS CITY</h1>
          <div className="login-input-container">
            <label htmlFor="email" className="login-label">
              Email
            </label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="ejemplo@email.com"
              required
              className="login-input"
            />
          </div>
          <div className="login-input-container">
            <label htmlFor="password" className="login-label">
              Contraseña
            </label>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              required
              className="login-input"
            />
          </div>
          <input
            className="login-button-sesion"
            type="submit"
            value="Iniciar sesion"
            onClick={onPressLogin}
          />
          <input
            className="login-button-registro"
            type="submit"
            value="¿No tienes cuenta? ¡Regístrate!"
          />
        </div>
      </div>
      <div className="login-right">
        <img src={loginFondo} alt="study" />
      </div>
    </div>
  );
}
