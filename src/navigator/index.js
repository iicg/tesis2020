import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  HomePage,
  LoginPage,
  ClasePage,
  NewAlumno,
  EditarAlumnoPage,
  NuevaClasePage,
  PerfilPage,
} from '../pages';
import '../App.css';
import EditarClase from '../pages/EditarClase';
import { Toast } from '../components';

export default function Navigator() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/perfil">
            <PerfilPage />
          </Route>
          <Route path="/editarclase/:uid">
            <EditarClase />
          </Route>
          <Route path="/nuevaclase">
            <NuevaClasePage />
          </Route>
          <Route path="/editaralumno/:uid">
            <EditarAlumnoPage />
          </Route>
          <Route path="/nuevoalumno">
            <NewAlumno />
          </Route>
          <Route path="/clase/:uid">
            <ClasePage />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
        <Toast />
      </div>
    </Router>
  );
}
