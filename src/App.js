import React from 'react';
import logo from './logo.svg';
import './App.css';

import { firebaseRef as firebase } from './firebase/firebase'

function App() {

  const email = 'tomasvzn@gmail.com';
  const password = '12345678';

  firebase.auth().onAuthStateChanged(user => {
    if(user){
      
    }
  })

  const crearClase = () => {
    const clase = {
      nombre: 'edd',
      profesor: 'leger',
      cantidadAlumnos: 32,
      activo: false,
      puntuacion: 4.3,
    }
    firebase.firestore().collection('clases').doc().set(clase);
  }

  const editarClase = () => {
    firebase.firestore().collection('clases').doc('SIXHk4rNT6nQcG7mNfAO').update({ profesor: 'telgie' })
  }


  return (
    <div className="App">
      <button onClick={() => firebase.auth().signInWithEmailAndPassword(email, password)}>CREAR USUARIO</button>
      <button onClick={crearClase}>CREAR CLASE</button>
      <button onClick={editarClase}>EDITAR CLASE</button>
    </div>
  );
}

export default App;
