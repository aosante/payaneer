import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { notifyUser } from '../../actions/notifyActions';
import Alert from '../layout/Alert';
import styled from 'styled-components';

const FormContainer = styled.div`
  height: 65vh;
  width: 50%;
  margin: 0 auto;
  position: relative;
  top: 10%;
  border-radius: 5px;
  box-shadow: 0 0 15px 0 #000;
  h1 {
    color: #fff;
    background-color: rgb(40, 53, 72);
    margin: 0;
    padding: 0.1em 0;
    text-align: center;
    border-radius: 5px 5px 0 0;
    border-bottom: 3px solid #eee;
    font-family: 'Indie Flower', cursive;
    font-size: 3em;
    font-weight: 700;
  }
  i {
    color: rgb(40, 53, 72);
    position: relative;
    top: -0.25em;
    font-size: 5em;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    padding-top: 1em;
    height: 70%;
  }
  .input-group {
    margin-bottom: 1em;
    height: auto;
  }
  label {
    font-weight: 700;
  }
  input {
    margin-top: 0.5em;
    display: block;
    width: 30em;
    padding: 0.5em;
    border-radius: 5px;
  }
  .submit-btn {
    padding: 0.5em 1em;
    margin-top: 2em;
    background-color: rgb(72, 160, 181);
    font-size: 1em;
    color: #fff;
    border-radius: 10px;
    &:hover {
      transform: scale(1.05);
      opacity: 0.8;
    }
  }
`;

class Login extends Component {
  state = {
    email: '',
    password: ''
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { firebase, notifyUser } = this.props;
    const { email, password } = this.state;
    firebase
      .login({
        email,
        password
      })
      .catch(err => notifyUser('Wrong username or password', 'error'));
  };
  render() {
    const { message, messageType } = this.props.notify;
    return (
      <React.Fragment>
        <FormContainer>
          <h1>Welcome to Payoneer</h1>
          <form onSubmit={this.onSubmit}>
            <i className="fa fa-user-circle" />
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                minLength="2"
                required
                placeholder="Enter your email"
                onChange={this.onChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                minLength="2"
                required
                placeholder="Enter your password"
                onChange={this.onChange}
              />
            </div>
            <button type="submit" className="submit-btn">
              Sign In
            </button>
          </form>
        </FormContainer>
        {message ? <Alert message={message} messageType={messageType} /> : null}
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  firebaseConnect: PropTypes.object
};

export default compose(
  firebaseConnect(),
  connect(
    state => ({
      notify: state.notify
    }),
    { notifyUser }
  )
)(Login);
