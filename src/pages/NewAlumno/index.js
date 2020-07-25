import React from 'react';
import { Header } from '../../components';

import './styles.css';

import useShallowEqualSelector from '../../shared/hooks/useShallowEqualSelector';
import { ReduxService } from '../../utils';
import { signOut } from '../../utils/firebase/session';

export default function NewAlumno() {
  const session = useShallowEqualSelector(ReduxService.session.selectors.active);

  return (
    <div className="newAl-body">
      <Header
        signOut={signOut}
        nombre={`${session.nombre} ${session.apellido}`}
        rut={session.rut}
      />
      <div className="newAl-container">
        <form>
          <div className="tituloNewAl">
            <h1>DATOS</h1>
          </div>
          <div className="datosNewAl">
            <div className="titulosNewAl">
              <div className="tituloDatoNewAl">
                <h1>Rut</h1>
              </div>
              <div className="tituloDatoNewAl">
                <h1>Nombre</h1>
              </div>
              <div className="tituloDatoNewAl">
                <h1>Apellido</h1>
              </div>
              <div className="tituloDatoNewAl">
                <h1>Email</h1>
              </div>
              <div className="tituloDatoNewAl">
                <h1>Tipo plan</h1>
              </div>
            </div>
            <div className="newDatosAl">
              <div className="datoNewAl">
                <input type="text" placeholder="rut" required />
              </div>
              <div className="datoNewAl">
                <input type="text" placeholder="nombre" required />
              </div>
              <div className="datoNewAl">
                <input type="text" placeholder="apellidos" required />
              </div>
              <div className="datoNewAl">
                <input type="text" placeholder="email" required />
              </div>
              <div className="datoNewAl">
                <select className="datoNewAl-select">
                  <option value="free">Free</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
            </div>
          </div>
          <div className="newAl-button">
            <input className="newAl-agregar" type="submit" value="Agregar" />
            <input className="newAl-cancelar" type="submit" value="Cancelar" />
          </div>
        </form>
      </div>
    </div>
  );
}
