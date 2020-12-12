/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from 'react-query';

import { add, getDate, isBefore, setDate, sub, format, formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';
import useShallowEqualSelector from '../../shared/hooks/useShallowEqualSelector';

import { Constants, ReduxService, Firebase, DateUtil } from '../../utils';
import { Header } from '../../components';

import './styles.css';
import ModalPerfil from './ModalPerfil';

export default function Perfil() {
  const session = useShallowEqualSelector(ReduxService.session.selectors.active);
  const { data } = useQuery(['usuario', session.uid], Firebase.users.get);

  const [modalVisible, setModalVisible] = useState(false);

  const emailRef = useRef();
  const [newEmail, setNewEmail] = useState(data?.email);

  const telefonoRef = useRef();
  const [newTelefono, setNewTelefono] = useState('');

  const direccionRef = useRef();
  const [newDireccion, setNewDireccion] = useState('');

  const preexistenciaRef = useRef();
  const [newPreexistencia, setNewPreexistencia] = useState('');

  const pesoRef = useRef();
  const [newPeso, setNewPeso] = useState('');

  const alturaRef = useRef();
  const [newAltura, setNewAltura] = useState('');

  useEffect(() => {
    setNewEmail(data?.email);
    setNewTelefono(data?.telefono);
    setNewDireccion(data?.direccion);
    setNewPreexistencia(data?.preexistencia);
    setNewPeso(data?.peso);
    setNewAltura(data?.altura);
  }, [data]);

  const onSaveField = async (field, value) => {
    if (value) {
      if (value.trim() !== '' || data[field] !== value.trim()) {
        Firebase.users.update(session.uid, { [field]: value }).then(() => {
          ReduxService.dispatch(
            ReduxService.session.actions.update({ toastMessage: 'Cambio guardado exitosamente' }),
          );
        });
      }
    }
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
        <div className="perfil-page-title">
          <h1 className="perfil-nombre">
            {data?.nombre} {data?.apellido}
          </h1>
          <input
            onClick={() => setModalVisible(true)}
            type="button"
            value="Revisar informe"
            className="perfil-boton-informe"
          />
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
            <label htmlFor="preexistencia">Preexistencia / enfermedades médicas</label>
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
        <div className="perfil-page-detail">
          <div>
            <label htmlFor="peso">Peso (en kilogramos)</label>
            <input
              ref={pesoRef}
              id="peso"
              value={newPeso}
              onChange={({ target }) => setNewPeso(target.value)}
              type="text"
              pattern="[0-9]*"
              onBlur={() => onSaveField('peso', newPeso)}
            />
          </div>
          <span onClick={() => preexistenciaRef.current.focus()} className="material-icons">
            create
          </span>
        </div>
        <div className="perfil-page-detail">
          <div>
            <label htmlFor="altura">Altura (en centímetros)</label>
            <input
              ref={alturaRef}
              id="altura"
              value={newAltura}
              onChange={({ target }) => setNewAltura(target.value)}
              type="text"
              pattern="[0-9]*"
              maxLength={3}
              onBlur={() => onSaveField('altura', newAltura)}
            />
          </div>
          <span onClick={() => preexistenciaRef.current.focus()} className="material-icons">
            create
          </span>
        </div>
        <ModalPerfil
          peso={data?.peso}
          pesoInicial={data?.pesoInicial}
          altura={data?.altura / 100}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </div>
    </div>
  );
}
