import { Meteor } from 'meteor/meteor';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Login from '../ui/Login';
import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import ContactList from '../ui/ContactList';
import NotFound from '../ui/NotFound';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        Meteor.userId() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/" }} />
        )
      }
    />
  );
}

export const routes = (
  <Router>
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route path="/signup" component={Signup}/>
      <PrivateRoute path="/dashboard" component={Dashboard}/>
      <PrivateRoute path="/contactlist" component={ContactList}/>
      <Route path="*" component={NotFound}/>
    </Switch>
  </Router>
);
