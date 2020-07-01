import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

import { firebaseRef as firebase } from './firebase/firebase'

import { LoginPage } from './pages';

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
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
