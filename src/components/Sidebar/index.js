import React from 'react';
import './styles.css';

export default function Sidebar(props) {
  const { opcion, admin, salir, setOpcion } = props;

  return (
    <div className="left-container">
      <div>
        <button
          className={`sidebar-button ${opcion === 0 && 'sidebar-button-selected'} `}
          onClick={() => setOpcion(0)}
          type="button">
          <h5 className={opcion === 0 && 'sidebar-text-selected'}>
            <span className="material-icons">fitness_center</span> Clases
          </h5>
        </button>
        {admin && (
          <button
            className={`sidebar-button ${opcion === 1 && 'sidebar-button-selected'} `}
            onClick={() => setOpcion(1)}
            type="button">
            <h5 className={opcion === 1 && 'sidebar-text-selected'}>
              <span className="material-icons">school</span> Alumnos
            </h5>
          </button>
        )}
        {!admin && (
          <>
            <button
              className={`sidebar-button ${opcion === 2 && 'sidebar-button-selected'} `}
              onClick={() => setOpcion(2)}
              type="button">
              <h5 className={opcion === 2 && 'sidebar-text-selected'}>
                <span className="material-icons">bookmark_border</span> Reservas
              </h5>
            </button>
            <button
              className={`sidebar-button ${opcion === 3 && 'sidebar-button-selected'} `}
              onClick={() => setOpcion(3)}
              type="button">
              <h5 className={opcion === 3 && 'sidebar-text-selected'}>
                <span className="material-icons">calendar_today</span> Calendario
              </h5>
            </button>
            <button
              className={`sidebar-button ${opcion === 4 && 'sidebar-button-selected'} `}
              onClick={() => setOpcion(4)}
              type="button">
              <h5 className={opcion === 4 && 'sidebar-text-selected'}>
                <span className="material-icons">request_quote</span> Planes
              </h5>
            </button>
          </>
        )}
        {admin && (
          <button
            className={`sidebar-button ${opcion === 5 && 'sidebar-button-selected'} `}
            onClick={() => setOpcion(5)}
            type="button">
            <h5 className={opcion === 5 && 'sidebar-text-selected'}>
              <span className="material-icons">trending_up</span> Reportes
            </h5>
          </button>
        )}
      </div>
      <button onClick={salir} className="sidebar-salir-button" type="button">
        <span className="material-icons">power_settings_new</span> Cerrar sesión
      </button>
    </div>
  );
}
