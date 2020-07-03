import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD8ZKGH5VXiwZrxLaBEOVCX6DyaUnhRlIc',
  authDomain: 'tesising2020.firebaseapp.com',
  databaseURL: 'https://tesising2020.firebaseio.com',
  projectId: 'tesising2020',
  storageBucket: 'tesising2020.appspot.com',
  messagingSenderId: '45701640722',
  appId: '1:45701640722:web:3fac4c247ad8a07614decb',
};

export function initFirebase() {
  try {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
  } catch (err) {
    alert('Error al conectar con la base de datos.');
  }
}

export const firebaseRef = firebase;
