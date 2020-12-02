/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from 'react-query';

import './styles.css';
import { add, getDate, isBefore, setDate, sub, format, formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';
import useShallowEqualSelector from '../../shared/hooks/useShallowEqualSelector';

import { Constants, ReduxService, Firebase, DateUtil } from '../../utils';
import { Header } from '../../components';

export default function Perfil() {
  const session = useShallowEqualSelector(ReduxService.session.selectors.active);
  const { data } = useQuery(['usuario', session.uid], Firebase.users.get);

  const emailRef = useRef();
  const [newEmail, setNewEmail] = useState(data?.email);

  const telefonoRef = useRef();
  const [newTelefono, setNewTelefono] = useState('');

  const direccionRef = useRef();
  const [newDireccion, setNewDireccion] = useState('');

  const preexistenciaRef = useRef();
  const [newPreexistencia, setNewPreexistencia] = useState('');

  useEffect(() => {
    setNewEmail(data?.email);
    setNewTelefono(data?.telefono);
    setNewDireccion(data?.direccion);
    setNewPreexistencia(data?.preexistencia);
  }, [data]);

  const onSaveField = async (field, value) => {
    Firebase.users.update(session.uid, { [field]: value }).then(() => {
      ReduxService.dispatch(
        ReduxService.session.actions.update({ toastMessage: 'Cambio guardado exitosamente' }),
      );
    });
  };

  const onPressEditContraseña = () => {
    Firebase.session.resetPassword(data?.email);
  };

  const saveNewEmail = async () => {
    if (newEmail !== data?.email) {
      Firebase.session.setNewEmail(newEmail).catch(({ code }) => {
        ReduxService.dispatch(
          ReduxService.session.actions.update({ toastMessage: Constants.ERRORES[code] }),
        );
        setNewEmail(data?.email);
      });
    }
  };

  const proximaFechaPago = useMemo(() => {
    if (data?.fechaIngreso) {
      const fecha = DateUtil.timestampToDate(data.fechaIngreso);
      const dia = getDate(fecha);
      const proxFecha = sub(setDate(new Date(), dia), { days: 3 });
      if (isBefore(proxFecha, new Date())) {
        return `Próxima fecha de pago: ${format(add(proxFecha, { months: 1 }), 'dd/MM/yyyy', {
          locale: es,
        })} (dentro de ${formatDistance(add(proxFecha, { months: 1 }), new Date(), {
          locale: es,
        })})`;
      }
      return `Próxima fecha de pago: ${format(proxFecha, 'dd/MM/yyyy', {
        locale: es,
      })} (dentro de ${formatDistance(proxFecha, new Date(), { locale: es })})`;
    }
    return '';
  }, [data]);

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
          <h1 className="perfil-page-title">
            {data?.nombre} {data?.apellido}
          </h1>
        </div>
        <div className="perfil-page-detail">
          <div>
            <label htmlFor="rut">RUT</label>
            <input disabled id="rut" value={data?.rut} type="text" />
          </div>
        </div>
        <div className="perfil-page-detail">
          <div>
            <label htmlFor="email">Correo electrónico</label>
            <input
              ref={emailRef}
              id="email"
              value={newEmail}
              onChange={({ target }) => setNewEmail(target.value)}
              type="text"
              onBlur={() => {
                saveNewEmail();
                onSaveField('email', newEmail);
              }}
            />
          </div>
          <span onClick={() => emailRef.current.focus()} className="material-icons">
            create
          </span>
        </div>
        <div className="perfil-page-detail">
          <div>
            <label htmlFor="password">Contraseña</label>
            <input disabled id="password" value="• • • • • • • •" type="text" />
          </div>
          <span onClick={onPressEditContraseña} className="material-icons">
            create
          </span>
        </div>
        <div className="perfil-page-detail">
          <div>
            <label htmlFor="telefono">Télefono</label>
            <input
              ref={telefonoRef}
              id="telefono"
              value={newTelefono}
              onChange={({ target }) => setNewTelefono(target.value)}
              type="text"
              onBlur={() => onSaveField('telefono', newTelefono)}
            />
          </div>
          <span onClick={() => telefonoRef.current.focus()} className="material-icons">
            create
          </span>
        </div>
        <div className="perfil-page-detail">
          <div>
            <label htmlFor="direccion">Dirección</label>
            <input
              ref={direccionRef}
              id="direccion"
              value={newDireccion}
              onChange={({ target }) => setNewDireccion(target.value)}
              type="text"
              onBlur={() => onSaveField('direccion', newDireccion)}
            />
          </div>
          <span onClick={() => direccionRef.current.focus()} className="material-icons">
            create
          </span>
        </div>
        <div className="perfil-page-detail">
          <div>
            <label htmlFor="tipoPlan">Tipo de plan</label>
            <input
              disabled
              id="tipoPlan"
              value={Constants.TIPOS_PLAN[data?.tipoPlan]}
              type="text"
            />
            <span>{proximaFechaPago}</span>
          </div>
        </div>
        <div className="perfil-page-detail">
          <div>
            <label htmlFor="preexistencia">Preexistencia</label>
            <input
              ref={preexistenciaRef}
              id="preexistencia"
              value={newPreexistencia}
              onChange={({ target }) => setNewPreexistencia(target.value)}
              type="text"
              onBlur={() => onSaveField('preexistencia', newPreexistencia)}
            />
          </div>
          <span onClick={() => preexistenciaRef.current.focus()} className="material-icons">
            create
          </span>
        </div>
      </div>
    </div>
  );
}
