import { firebaseRef as firebase } from './firebase';
import ReduxService from '../redux-service';
import { extractSnapshotDocsData } from './utils';

function getClassesReference() {
  return firebase.firestore().collection('clases');
}

// eslint-disable-next-line import/prefer-default-export
export function getAllClasses() {
  getClassesReference()
    .get()
    .then(extractSnapshotDocsData)
    .then((data) => ReduxService.dispatch(ReduxService.classes.actions.set(data)));
}

export function deleteClass(id) {
  getClassesReference()
    .doc(id)
    .delete()
    .then(() => ReduxService.dispatch(ReduxService.classes.actions.remove(id)));
}

export async function createClass(data) {
  const claseRef = getClassesReference().doc();
  return getClassesReference()
    .doc(claseRef.id)
    .set({ ...data, uid: claseRef.id });
}

export function updateClase(uid, change) {
  return getClassesReference().doc(uid).update(change);
}

export function getClassesFromArray(key, array) {
  return getClassesReference().where('uid', 'in', array).get().then(extractSnapshotDocsData);
}
