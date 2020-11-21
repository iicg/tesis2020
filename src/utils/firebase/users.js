import { firebaseRef as firebase } from './firebase';
import ReduxService from '../redux-service';
import { extractSnapshotDocsData } from './utils';

function getUsersReference() {
  return firebase.firestore().collection('usuarios');
}

// eslint-disable-next-line import/prefer-default-export
export function getAllUsuarios() {
  getUsersReference()
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
