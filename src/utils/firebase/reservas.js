import { firebaseRef as firebase } from './firebase';
import ReduxService from '../redux-service';

import { extractSnapshotDocsData } from './utils';

function getReservasReference() {
  return firebase
    .firestore()
    .collection('usuarios')
    .doc(ReduxService.getState().session.uid)
    .collection('reservas');
}

export function getAllReservas() {
  getReservasReference()
    .get()
    .then(extractSnapshotDocsData)
    .then((data) => ReduxService.dispatch(ReduxService.reservas.actions.set(data)));
}

export function createReserva(clase) {
  const reserva = {
    fechaReserva: firebase.firestore.Timestamp.fromDate(new Date()),
    idClase: clase.uid,
    nombreClase: clase.nombre,
  };

  return getReservasReference()
    .doc()
    .set(reserva)
    .then(() => ReduxService.dispatch(ReduxService.reservas.actions.add(reserva)));
}
