import React, { useCallback } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import { add, parse, format } from 'date-fns';

import useShallowEqualSelector from '../../shared/hooks/useShallowEqualSelector';
import { Firebase, ReduxService } from '../../utils';

import './styles.css';

const DAYS = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

export default function ContainerCalendario() {
  const { reservas } = useShallowEqualSelector({
    reservas: ReduxService.reservas.selectors.list,
  });

  const clasesQuery = useQuery(
    ['clasesCalendario', reservas.map(({ idClase }) => idClase)],
    Firebase.classes.getFromArray,
  );

  const renderClase = useCallback(({ uid, nombre, horaInicio, duracion, dia }) => {
    const position = (Number(horaInicio.replace(':', '')) - 800) / 1400;

    const columnaDia = document.getElementById(`columna${dia}`);
    const espacioDia = document.getElementById(`espacio${dia}`);
    const topOffset = espacioDia?.clientHeight * position;
    const fechaTermino = add(parse(horaInicio, 'HH:mm', new Date()), { hours: duracion });

    return (
      <Link to={`/clase/${uid}`}>
        <div
          className="container-calendario-block"
          style={{ width: columnaDia?.clientWidth, height: duracion * 64, top: topOffset + 200 }}>
          <span className="container-calendario-block-titulo">{nombre}</span>
          <span className="container-calendario-block-hora">
            Inicio: <b>{horaInicio}</b>
          </span>
          <span className="container-calendario-block-hora">
            Término: <b>{format(fechaTermino, 'HH:mm')}</b>
          </span>
        </div>
      </Link>
    );
  }, []);

  return (
    <div className="container-calendario-container">
      <h1 className="container-calendario-titulo">Calendario</h1>
      <div className="container-calendario">
        {DAYS.map((dia) => {
          return (
            <div className="container-calendario-day-container">
              <div id={`columna${dia}`} className="container-calendario-day-header">
                {dia}
              </div>
              <div id={`espacio${dia}`} style={{ height: '100%' }}>
                {clasesQuery.data?.filter((clase) => clase.dia === dia)?.map(renderClase)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
