import { firebaseRef as firebase } from './firebase';
import { persistor } from '../../redux/configure-store';
import ReduxService from '../redux-service';

function getUserReference() {
  return firebase.firestore().collection('usuarios');
}

export function signIn(email, password) {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  firebase.auth().signInWithEmailAndPassword(email, password);
}

function formatSession(user) {
  return {
    name: user.displayName,
    email: user.email,
    photoUrl: user.photoURL,
    emailVerified: user.emailVerified,
    uid: user.uid,
  };
}

function getSessionData(uid) {
  getUserReference()
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        ReduxService.dispatch(ReduxService.session.actions.update(doc.data()));
      }
    });
}

function handleLoginStatusChange(user) {
  if (user) {
    const session = formatSession(user);
    ReduxService.dispatch(ReduxService.session.actions.update(session));
    getSessionData(user.uid);
  }
}

export async function setupSessionListeners() {
  firebase.auth().onAuthStateChanged(handleLoginStatusChange);
}

export function signOut() {
  persistor.purge();
  window.location.replace('/');
  firebase.auth().signOut();
}
