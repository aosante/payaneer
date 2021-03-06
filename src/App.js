import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth';

import { Provider } from 'react-redux';
import store from './store';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/layout/Dashboard';
import AddClient from './components/clients/AddClient';
import EditClient from './components/clients/EditClient';
import ClientDetails from './components/clients/ClientDetails';
import Settings from './components/settings/Settings';

import styled from 'styled-components';
import './App.css';

const Main = styled.main`
  height: 100%;
  display: flex;
`;

const Container = styled.div`
  flex: 5;
  background-color: rgb(233, 236, 239);
  padding: 2em;
  margin-left: 16em;
  min-height: 100vh;
  height: auto;
`;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Main>
            <Navbar />
            <Container>
              <Switch>
                <Route
                  exact
                  path="/"
                  component={UserIsAuthenticated(Dashboard)}
                />
                <Route
                  path="/client/add"
                  component={UserIsAuthenticated(AddClient)}
                />
                <Route
                  path="/client/edit/:id"
                  component={UserIsAuthenticated(EditClient)}
                />
                <Route
                  path="/client/:id"
                  component={UserIsAuthenticated(ClientDetails)}
                />
                <Route
                  path="/login"
                  component={UserIsNotAuthenticated(Login)}
                />
                <Route
                  path="/register"
                  component={UserIsNotAuthenticated(Register)}
                />
                <Route
                  path="/settings"
                  component={UserIsAuthenticated(Settings)}
                />
              </Switch>
            </Container>
          </Main>
        </Router>
      </Provider>
    );
  }
}

export default App;
