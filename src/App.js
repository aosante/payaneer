import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/layout/Dashboard';
import AddClient from './components/clients/AddClient';
import ClientDetails from './components/clients/ClientDetails';
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
                <Route exact path="/" component={Dashboard} />
                <Route path="/client/add" component={AddClient} />
                <Route path="/client/:id" component={ClientDetails} />
              </Switch>
            </Container>
          </Main>
        </Router>
      </Provider>
    );
  }
}

export default App;
