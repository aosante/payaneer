import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/layout/Dashboard';
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
      <Router>
        <Main>
          <Navbar />
          <Container>
            <Switch>
              <Route exact path="/" component={Dashboard} />
            </Switch>
          </Container>
        </Main>
      </Router>
    );
  }
}

export default App;
