import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';

import { LoginPage, LoadingPage, HomePage } from './pages';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/">
            <LoadingPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
