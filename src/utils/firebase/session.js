import { firebaseRef as firebase } from './firebase';

export function signIn(email, password) {
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      firebase.auth().signInWithEmailAndPassword(email, password);
    })
    .catch((error) => alert(error));
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
    console.log(formatSession(user));
  }
}

export async function setupSessionListeners() {
  firebase.auth().onAuthStateChanged(handleLoginStatusChange);
}
