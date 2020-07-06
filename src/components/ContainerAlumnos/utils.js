import React from 'react';
import AlumnoItem from '../AlumnoItem';

// eslint-disable-next-line import/prefer-default-export
export function renderAlumno(alumno) {
  return <AlumnoItem alumno={alumno} />;
}
