import { firebaseRef as firebase } from './firebase';
import ReduxService from '../redux-service';

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

function handleLoginStatusChange(user) {
  if (user) {
    const session = formatSession(user);
    ReduxService.dispatch(ReduxService.session.actions.set(session));
  }
}

export async function setupSessionListeners() {
  firebase.auth().onAuthStateChanged(handleLoginStatusChange);
}

export function signOut() {
  firebase.auth().signOut();
}
