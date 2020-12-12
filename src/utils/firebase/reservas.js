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

  firebase
    .firestore()
    .collection('clases')
    .doc(clase.uid)
    .update({
      alumnos: firebase.firestore.FieldValue.arrayUnion(ReduxService.getState().session.uid),
    });

  return reservaRef
    .set(reserva)
    .then(() => ReduxService.dispatch(ReduxService.reservas.actions.add(reserva)));
}

export async function deleteReserva({ uid, idClase }) {
  await firebase
    .firestore()
    .collection('clases')
    .doc(idClase)
    .update({
      alumnos: firebase.firestore.FieldValue.arrayRemove(ReduxService.getState().session.uid),
    });

  return getReservasReference()
    .doc(uid)
    .delete()
    .then(() => ReduxService.dispatch(ReduxService.reservas.actions.remove(uid)))
    .catch(() =>
      ReduxService.dispatch(
        ReduxService.session.actions.update({
          toastMessage: 'Hubo un error al eliminar la reserva.',
        }),
      ),
    );
}
