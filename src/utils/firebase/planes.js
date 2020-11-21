/* eslint-disable import/prefer-default-export */
import { firebaseRef as firebase } from './firebase';
import { extractSnapshotDocsData } from './utils';

function getTipoPlanesReference() {
  return firebase.firestore().collection('tipoPlanes');
}

export function getTiposPlanes() {
  return getTipoPlanesReference()
    .get()
    .then((snapshot) => {
      let result = {};
      snapshot.forEach((doc) => {
        result = { ...result, [doc.id]: doc.data() };
      });
      return result;
    });
}
