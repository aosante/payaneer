import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: rgb(40, 53, 72);
  position: fixed;
  height: 110vh;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0 0 1.4em 0;
  .link {
    text-align: center;
    padding: 2rem;
    color: white;
    font-family: 'Indie Flower', cursive;
    font-size: 3em;
    width: 85%;
    margin: 0;
    position: relative;
  }
  .link::after {
    content: '';
    background-color: rgba(255, 255, 255, 0.55);
    width: 170px;
    height: 2px;
    position: absolute;
    left: 1.2em;
    top: 2.7em;
  }
  div {
    display: block;
  }
  #navbarMain {
    margin-top: 2em;
    padding: 0;
  }
  #navbarMain li {
    list-style-type: none;
    position: relative;
    left: -2em;
  }
  a,
  p {
    color: white;
    text-decoration: none;
    font-size: 1em;
  }
  a:hover {
    transform: scale(1.1);
    opacity: 0.7;
  }
  .sub-section {
    position: relative;
    top: 25em;
  }
  .sub-section li {
    border: 2px solid rgb(72, 160, 181);
    text-align: center;
    transform: translateX(0.5em);
    border-radius: 5px;
  }
  .sub-section li:hover {
    background-color: rgb(72, 160, 181);
  }
  .allow-registration {
    padding: 3em;
    margin-left: -7em;
    position: relative;
    top: -3em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .allow-registration li {
    margin-bottom: 1em;
  }
`;

class Navbar extends Component {
  state = {
    isAuth: false
  };

  static getDerivedStateFromProps(props) {
    const { auth } = props;
    if (auth.uid) {
      return { isAuth: true };
    } else {
      return { isAuth: false };
    }
  }

  logOut = () => {
    const { firebase } = this.props;
    firebase.logout();
  };
  render() {
    const { isAuth } = this.state;
    const { auth } = this.props;
    const { allowRegistration } = this.props.settings;
    return (
      <Nav>
        <Link to="/" className="link">
          Payoneer
        </Link>
        {/* <button
            type="button"
            data-toggle="collapse"
            data-target="#navbarMain"
          /> */}
        <div id="navbarMain">
          <ul>
            {isAuth ? (
              <div>
                <li>
                  <Link to="/">
                    <i className="fa fa-book" style={{ marginRight: '.5em' }} />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/settings">
                    <i
                      className="fa fa-cog"
                      style={{ marginRight: '.5em', marginTop: '1em' }}
                    />
                    Settings
                  </Link>
                </li>
                <li>
                  <p>
                    <i className="fa fa-user" style={{ marginRight: '.5em' }} />
                    {auth.email}
                  </p>
                </li>
                <div className="sub-section">
                  <li>
                    <p onClick={this.logOut}>Log Out</p>
                  </li>
                </div>
              </div>
            ) : null}
            {allowRegistration && !isAuth ? (
              <div className="allow-registration">
                <li>
                  <Link to="/login">
                    <i
                      className="fa fa-sign-in"
                      style={{ marginRight: '.5em' }}
                    />
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register">
                    <i
                      className="fa fa-user-plus"
                      style={{ marginRight: '.5em' }}
                    />
                    Register
                  </Link>
                </li>
              </div>
            ) : null}
          </ul>
        </div>
      </Nav>
    );
  }
}

Navbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }))
)(Navbar);
