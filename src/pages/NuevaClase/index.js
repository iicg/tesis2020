import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Header } from '../../components';

import './styles.css';

import { Firebase } from '../../utils';
import debounce from 'lodash.debounce';

export default function NuevaClasePage() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [entrenador, setEntrenador] = useState('');
  const [duracion, setDuracion] = useState('1');
  const [dia, setDia] = useState('lunes');
  const [horaInicio, setHoraInicio] = useState('10:00');

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

  const handleNombreChange = debounce(async (newNombre) => {
    const usuariosConRut = await Firebase.classes.checkNombre(newNombre);
    if (usuariosConRut.length) {
      alert(`¡${newNombre} YA EXISTE!`);
      setNombre('');
    }
  }, 500);

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
                <h1>Día</h1>
              </div>
              <div className="titulo-dato-nueva-clase">
                <h1>Hora de inicio</h1>
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
                  onChange={(e) => {
                    setNombre(e.target.value);
                    handleNombreChange(e.target.value);
                  }}
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
                  value={dia}
                  onChange={(e) => setDia(e.target.value)}>
                  <option value="lunes">Lunes</option>
                  <option value="martes">Martes</option>
                  <option value="miercoles">Miércoles</option>
                  <option value="jueves">Jueves</option>
                  <option value="viernes">Viernes</option>
                  <option value="sabado">Sábado</option>
                  <option value="domingo">Domingo</option>
                </select>
              </div>
              <div className="dato-nueva-clase">
                <select
                  className="dato-nueva-clase-select"
                  value={horaInicio}
                  onChange={(e) => setHoraInicio(e.target.value)}>
                  <option value="10:00">10:00</option>
                  <option value="10:30">10:30</option>
                  <option value="11:00">11:00</option>
                  <option value="11:30">11:30</option>
                  <option value="12:00">12:00</option>
                  <option value="12:30">12:30</option>
                  <option value="13:00">13:00</option>
                  <option value="13:30">13:30</option>
                  <option value="14:00">14:00</option>
                  <option value="14:30">14:30</option>
                  <option value="15:00">15:00</option>
                  <option value="15:30">15:30</option>
                  <option value="16:00">16:00</option>
                  <option value="16:30">16:30</option>
                  <option value="170:00">17:00</option>
                  <option value="170:30">17:30</option>
                  <option value="18:00">18:00</option>
                  <option value="18:30">18:30</option>
                  <option value="19:00">19:00</option>
                  <option value="19:30">19:30</option>
                </select>
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
