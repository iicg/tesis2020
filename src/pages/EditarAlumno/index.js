import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DateTime } from 'luxon';

import { Header } from '../../components';

import './styles.css';

import { ReduxService, Firebase, DateUtil } from '../../utils';
import useShallowEqualSelector from '../../shared/hooks/useShallowEqualSelector';

export default function EditarAlumno() {
  const alumnos = useShallowEqualSelector(ReduxService.users.selectors.list);
  const { uid } = useParams();

  const [rut, setRut] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [preexistencia, setPreexistencia] = useState('');
  const [tipoPlan, setTipoPlan] = useState('inicial');
  const [fechaIngreso, setFechaIngreso] = useState(new Date());
  const [tipoUsuario, setTipoUsuario] = useState(false); // true => admin, false => cliente

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const alumno = alumnos.filter((user) => user.uid === uid)[0];
    if (alumno) {
      setRut(alumno.rut);
      setNombre(alumno.nombre);
      setApellido(alumno.apellido);
      setEmail(alumno.email);
      setTipoPlan(alumno.tipoPlan);
      setFechaIngreso(DateUtil.timestampToDate(alumno.fechaIngreso?.seconds));
      setTipoUsuario(alumno.admin);
      setDireccion(alumno.direccion);
      setTelefono(alumno.telefono);
      setPreexistencia(alumno.preexistencia);
    } else {
      window.location.replace('/home');
    }
  }, [alumnos, uid]);

  const onPress = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      uid,
      rut,
      nombre,
      apellido,
      email,
      tipoPlan,
      telefono,
      direccion,
      preexistencia,
    };

    Firebase.admin.updateUser(data).then(() => {
      alert('Usuario actualizado!');
      setLoading(false);
    });
  };

  return (
    <div className="newAl-body">
      <Header />
      <div className="newAl-container">
        <form onSubmit={onPress}>
          <div className="tituloNewAl">
            <h1>EDITAR ALUMNO</h1>
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
                <h1>Preexistencia</h1>
              </div>
            </div>
            <div className="newDatosAl">
              <div className="datoNewAl">
                <input
                  value={rut}
                  onChange={(e) => setRut(e.target.value)}
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
                  onChange={(e) => setTelefono(e.target.value)}
                  type="text"
                  placeholder="+56912345678"
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
                  value={DateTime.fromJSDate(fechaIngreso).setLocale('es').toFormat('DDD')}
                  type="text"
                  placeholder="ejemplo@email.com"
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
              value={loading ? 'Guardando' : 'Guardar'}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
