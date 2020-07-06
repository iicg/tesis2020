// eslint-disable-next-line import/prefer-default-export
export function list(state) {
  return state.users;
}

export function listAlumnos(state) {
  return state.users.filter((alumno) => !alumno.admin);
}

export function listAdministradores(state) {
  return state.users.filter((alumno) => alumno.admin);
}
