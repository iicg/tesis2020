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
