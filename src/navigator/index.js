import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HomePage, LoginPage, LoadingPage } from '../pages';
import '../App.css';

export default function Navigator() {
  return (
    <Router>
      <div>
        <Switch>
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
