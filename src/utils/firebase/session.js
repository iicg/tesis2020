import { func } from 'prop-types';
import { firebaseRef as firebase } from './firebase';
import { persistor } from '../../redux/configure-store';
import ReduxService from '../redux-service';
import { Constants } from '..';

function getUserReference() {
  return firebase.firestore().collection('usuarios');
}

export function signIn(email, password) {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  return firebase.auth().signInWithEmailAndPassword(email, password);
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
        ReduxService.dispatch(
          ReduxService.session.actions.update({ ...doc.data(), authenticated: true }),
        );
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

export function sendResetPasswordEmail(email) {
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      alert('Se ha enviado un correo electrónico de reestablecimiento de contraseña');
    })
    .catch(() => alert('Ha ocurrido un error al enviar correo de reestablecimiento de contraseña'));
}

export function setNewEmail(email) {
  return firebase
    .auth()
    .currentUser.updateEmail(email)
    .then(() => {
      ReduxService.dispatch(
        ReduxService.session.actions.update({
          toastMessage: 'El correo electrónico se ha guardado correctamente.',
        }),
      );
    });
}
