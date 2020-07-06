import React from 'react';
import './styles.css';

export default function Sidebar(props) {
  const { admin, setOpcion } = props;

  return (
    <header className="left-container">
      <button onClick={() => setOpcion(0)} type="button">
        Modulo Clases
      </button>
      {admin && (
        <button onClick={() => setOpcion(1)} type="button">
          Modulo Alumnos
        </button>
      )}
    </header>
  );
}
