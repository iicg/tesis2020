import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HomePage, LoginPage, ClasePage, NewAlumno, EditarAlumnoPage } from '../pages';
import '../App.css';

export default function Navigator() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/editaralumno/:uid">
            <EditarAlumnoPage />
          </Route>
          <Route path="/nuevoalumno">
            <NewAlumno />
          </Route>
          <Route path="/clase/:id">
            <ClasePage />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
