import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Header } from '../../components';

import './styles.css';

import { Firebase } from '../../utils';

export default function NuevaClasePage() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [entrenador, setEntrenador] = useState('');
  const [duracion, setDuracion] = useState('1');

  const [loading, setLoading] = useState(false);

  const onPress = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      nombre,
      descripcion,
      entrenador,
      duracion: Number(duracion),
    };

    Firebase.classes
      .create(data)
      .then(() => {
        alert('Clase creada!');
        setLoading(false);
      })
      .catch((e) => alert(e));
  };

  return (
    <div className="nueva-clase-body">
      <Header />
      <div className="nueva-clase-container">
        <form onSubmit={onPress}>
          <div className="titulo-nueva-clase">
            <h1>AGREGAR NUEVA CLASE</h1>
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
              value={loading ? 'Agregando' : 'Agregar'}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
