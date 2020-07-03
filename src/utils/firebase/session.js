import { firebaseRef as firebase } from './firebase';

// eslint-disable-next-line import/prefer-default-export
export function signIn(email, password) {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error));
}

function handleLoginStatusChange(user) {
  if (user) {
    console.log(user);
  }
}

export async function setupSessionListeners() {
  firebase.auth().onAuthStateChanged(handleLoginStatusChange);
}
