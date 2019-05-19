import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Signup from './pages/Signup';
import Login from './pages/Login';
import Private from './pages/Private';
import Navbar from "./components/Navbar";

import AuthProvider from "./lib/AuthProvider";
import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="container">
          <Navbar />
          <h1>Basic React Authentication</h1>

          <Switch>
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />
            <PrivateRoute path="/private" component={Private} />
          </Switch>
        </div>
      </AuthProvider>
      );
  }
}

export default App;
