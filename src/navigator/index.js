import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HomePage, LoginPage, LoadingPage } from '../pages';
import useShallowEqualSelector from '../shared/hooks/useShallowEqualSelector';
import { ReduxService } from '../utils';
import '../App.css';

export default function Navigator() {
  const session = useShallowEqualSelector(ReduxService.session.selectors.active);

  return (
    <Router history={History}>
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
