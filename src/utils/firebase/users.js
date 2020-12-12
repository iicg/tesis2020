import { firebaseRef as firebase } from './firebase';
import ReduxService from '../redux-service';
import { extractSnapshotDocsData } from './utils';

function getUsersReference() {
  return firebase.firestore().collection('usuarios');
}

export function getAllUsuarios() {
  return getUsersReference()
    .get()
    .then(extractSnapshotDocsData)
    .then((data) => ReduxService.dispatch(ReduxService.users.actions.set(data)));
}

export function getUsuario(key, uid) {
  return getUsersReference()
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      }
      return null;
    });
}

export function updateUsuario(uid, change) {
  return getUsersReference().doc(uid).update(change);
}

export async function checkRut(nuevoRut) {
  const usuarios = await getUsersReference().get().then(extractSnapshotDocsData);
  return usuarios.filter(({ rut }) => rut === nuevoRut);
}

export function getActiveUsers() {
  return getUsersReference()
    .where('fechaIngreso', '<', new Date())
    .get()
    .then(extractSnapshotDocsData);
}

export async function queryAllUsers() {
  return getUsersReference().get().then(extractSnapshotDocsData);
}
