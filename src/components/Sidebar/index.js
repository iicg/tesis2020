import React from 'react';
import './styles.css';

export default function Sidebar(props) {
  const { admin, opcion, setOpcion } = props;

  return (
    <header className="left-container">
      <div className="left-buttons-container">
        <button
          className={`sidebar-button ${opcion === 0 && 'sidebar-button-selected'} `}
          onClick={() => setOpcion(0)}
          type="button">
          <h5>
            <span className="material-icons">fitness_center</span> Clases
          </h5>
        </button>
        <button
          className={`sidebar-button ${opcion === 1 && 'sidebar-button-selected'} `}
          onClick={() => setOpcion(1)}
          type="button">
          <h5>
            <span className="material-icons">school</span> Alumnos
          </h5>
        </button>
        <button
          className={`sidebar-button ${opcion === 2 && 'sidebar-button-selected'} `}
          onClick={() => setOpcion(2)}
          type="button">
          <h5>
            <span className="material-icons">bookmark_border</span> Reservas
          </h5>
        </button>
        <button
          className={`sidebar-button ${opcion === 3 && 'sidebar-button-selected'} `}
          onClick={() => setOpcion(3)}
          type="button">
          <h5>
            <span className="material-icons">calendar_today</span> Calendario
          </h5>
        </button>
        <button
          className={`sidebar-button ${opcion === 4 && 'sidebar-button-selected'} `}
          onClick={() => setOpcion(4)}
          type="button">
          <h5>
            <span className="material-icons">request_quote</span> Planes
          </h5>
        </button>
      </div>
    </header>
  );
}
