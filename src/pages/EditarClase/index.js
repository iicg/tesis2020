import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Header } from '../../components';

import './styles.css';

import { ReduxService, Firebase } from '../../utils';
import useShallowEqualSelector from '../../shared/hooks/useShallowEqualSelector';

export default function EditarClase() {
  const clases = useShallowEqualSelector(ReduxService.classes.selectors.list);
  const { uid } = useParams();

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [entrenador, setEntrenador] = useState('');
  const [duracion, setDuracion] = useState('1');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const clase = clases.filter((c) => c.uid === uid)[0];
    if (clase) {
      setNombre(clase.nombre);
      setDescripcion(clase.descripcion);
      setEntrenador(clase.entrenador);
      setDuracion(clase.duracion);
    } else {
      window.location.replace('/home');
    }
  }, [clases, uid]);

  const onPress = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      uid,
      nombre,
      descripcion,
      entrenador,
      duracion,
    };
    Firebase.classes.update(uid, data).then(() => {
      alert('Guardado');
      setLoading(false);
    });
  };

  return (
    <div className="nueva-clase-body">
      <Header />
      <div className="nueva-clase-container">
        <form onSubmit={onPress}>
          <div className="titulo-nueva-clase">
            <h1>EDITAR CLASE</h1>
          </div>
          <div className="datos-nueva-clase">
            <div className="titulos-nueva-clase">
              <div className="titulo-dato-nueva-clase">
                <h1>Nombre</h1>
              </div>
              <div className="titulo-dato-nueva-clase" style={{ flex: 3 }}>
                <h1>Descripción</h1>
              </div>
              <div className="titulo-dato-nueva-clase">
                <h1>Duracion (hrs)</h1>
              </div>
              <div className="titulo-dato-nueva-clase">
                <h1>Rut del entrenador</h1>
              </div>
            </div>
            <div className="nuevos-datos-clase">
              <div className="dato-nueva-clase">
                <input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  type="text"
                  placeholder="Crossfit avanzado"
                  required
                />
              </div>
              <div className="dato-nueva-clase" style={{ flex: 5 }}>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  type="text"
                  placeholder="(...)"
                  required
                  style={{ height: 160 }}
                />
              </div>
              <div className="dato-nueva-clase">
                <select
                  className="dato-nueva-clase-select"
                  value={duracion}
                  onChange={(e) => setDuracion(e.target.value)}>
                  <option value="1">1 hora</option>
                  <option value="1.5">1 hora y media</option>
                  <option value="2">2 horas</option>
                  <option value="2.5">2 horas y media</option>
                  <option value="3">3 horas</option>
                </select>
              </div>
              <div className="dato-nueva-clase">
                <input
                  value={entrenador}
                  onChange={(e) => setEntrenador(e.target.value)}
                  type="text"
                  placeholder="12.345.678-9"
                  required
                />
              </div>
            </div>
          </div>
          <div className="nueva-clase-button">
            <Link to="/home">
              <input className="nueva-clase-cancelar" type="cancel" value="Cancelar" />
            </Link>
            <input
              disabled={loading}
              className="nueva-clase-agregar"
              type="submit"
              value={loading ? 'Guardando' : 'Guardar'}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
