import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';

import { DateTime } from 'luxon';

import { Header } from '../../components';

import './styles.css';

import { Firebase } from '../../utils';

export default function NewAlumno() {
  const [rut, setRut] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [preexistencia, setPreexistencia] = useState('');
  const [pesoInicial, setPesoInicial] = useState('');
  const [altura, setAltura] = useState('');
  const [tipoPlan, setTipoPlan] = useState('inicial');
  const [tipoUsuario, setTipoUsuario] = useState(false); // true => admin, false => cliente

  const [loading, setLoading] = useState(false);

  const onPress = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      rut,
      nombre,
      apellido,
      email,
      tipoPlan,
      admin: tipoUsuario,
      telefono,
      direccion,
      preexistencia,
      peso: pesoInicial,
      altura,
    };
    Firebase.admin
      .createUser(data)
      .then(() => {
        alert('Usuario creado!');
        setLoading(false);
      })
      .catch((e) => alert(e));
  };

  const handleRutChange = debounce(async (newRut) => {
    const usuariosConRut = await Firebase.users.checkRut(newRut);
    if (usuariosConRut.length) {
      alert('RUT YA EXISTE');
      setRut('');
    }
  }, 500);

  const handleTelefonoChange = (value) => {
    const re = /^[0-9\b]+$/;
    if (value === '' || re.test(value)) {
      setTelefono(value);
    }
  };

  const handlePesoChange = (value) => {
    const re = /^[0-9\b]+$/;
    if (value === '' || re.test(value)) {
      setPesoInicial(value);
    }
  };

  const handleAlturaChange = (value) => {
    const re = /^[0-9\b]+$/;
    if (value === '' || re.test(value)) {
      setAltura(value);
    }
  };

  return (
    <div className="newAl-body">
      <Header />
      <div className="newAl-container">
        <form onSubmit={onPress}>
          <div className="tituloNewAl">
            <h1>AGREGAR NUEVO ALUMNO</h1>
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
                <h1>Teléfono</h1>
              </div>
              <div className="tituloDatoNewAl">
                <h1>Dirección</h1>
              </div>
              <div className="tituloDatoNewAl">
                <h1>Tipo plan</h1>
              </div>
              <div className="tituloDatoNewAl">
                <h1>Fecha de creación</h1>
              </div>
              <div className="tituloDatoNewAl">
                <h1>Tipo usuario</h1>
              </div>
              <div className="tituloDatoNewAl">
                <h1>Preexistencia / enfermedades médicas</h1>
              </div>
              <div className="tituloDatoNewAl">
                <h1>Peso en kg</h1>
              </div>
              <div className="tituloDatoNewAl">
                <h1>Altura en cm</h1>
              </div>
            </div>
            <div className="newDatosAl">
              <div className="datoNewAl">
                <input
                  value={rut}
                  onChange={(e) => {
                    handleRutChange(e.target.value);
                    setRut(e.target.value);
                  }}
                  type="text"
                  placeholder="12.345.678-9"
                  required
                />
              </div>
              <div className="datoNewAl">
                <input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  type="text"
                  placeholder="Jose Manuel"
                  required
                />
              </div>
              <div className="datoNewAl">
                <input
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  type="text"
                  placeholder="Perez Gonzalez"
                  required
                />
              </div>
              <div className="datoNewAl">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="ejemplo@email.com"
                  required
                />
              </div>
              <div className="datoNewAl">
                <input
                  value={telefono}
                  onChange={(e) => handleTelefonoChange(e.target.value)}
                  type="text"
                  placeholder="912345678"
                  required
                />
              </div>
              <div className="datoNewAl">
                <input
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  type="text"
                  placeholder="Av. Principal #123"
                  required
                />
              </div>
              <div className="datoNewAl">
                <select
                  value={tipoPlan}
                  onChange={(e) => setTipoPlan(e.target.value)}
                  className="datoNewAl-select">
                  <option value="inicial">Plan inicial</option>
                  <option value="estudiante">Plan estudiante</option>
                  <option value="intermedio">Plan intermedio</option>
                  <option value="premium">Plan pro</option>
                </select>
              </div>
              <div className="datoNewAl">
                <input
                  value={DateTime.local().setLocale('es').toFormat('DDD')}
                  type="text"
                  disabled
                />
              </div>
              <div className="datoNewAl">
                <select
                  value={tipoUsuario}
                  onChange={(e) => setTipoUsuario(e.target.value)}
                  className="datoNewAl-select">
                  <option value>Administrador</option>
                  <option value={false}>Cliente</option>
                </select>
              </div>
              <div className="datoNewAl">
                <input
                  value={preexistencia}
                  onChange={(e) => setPreexistencia(e.target.value)}
                  type="text"
                  required
                />
              </div>
              <div className="datoNewAl">
                <input
                  value={pesoInicial}
                  onChange={(e) => handlePesoChange(e.target.value)}
                  type="text"
                  required
                  pattern="[0-9]*"
                  maxLength={3}
                />
              </div>
              <div className="datoNewAl">
                <input
                  value={altura}
                  onChange={(e) => handleAlturaChange(e.target.value)}
                  type="text"
                  required
                  pattern="[0-9]*"
                  maxLength={3}
                />
              </div>
            </div>
          </div>
          <div className="newAl-button">
            <Link to="/home">
              <input className="newAl-cancelar" type="cancel" value="Cancelar" />
            </Link>
            <input
              disabled={loading}
              className="newAl-agregar"
              type="submit"
              value={loading ? 'Agregando' : 'Agregar'}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
