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

export function queryAllReservas() {
  return getReservasReference().get().then(extractSnapshotDocsData);
}

export async function createReserva(clase) {
  const reservaRef = getReservasReference().doc();
  const reserva = {
    uid: reservaRef.id,
    fechaReserva: firebase.firestore.Timestamp.fromDate(new Date()),
    idClase: clase.uid,
    nombreClase: clase.nombre,
  };

  return reservaRef
    .set(reserva)
    .then(() => ReduxService.dispatch(ReduxService.reservas.actions.add(reserva)));
}

export function deleteReserva(idReserva) {
  getReservasReference()
    .doc(idReserva)
    .delete()
    .then(() => ReduxService.dispatch(ReduxService.reservas.actions.remove(idReserva)))
    .catch(() =>
      ReduxService.dispatch(
        ReduxService.session.actions.update({
          toastMessage: 'Hubo un error al eliminar la reserva.',
        }),
      ),
    );
}
