import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

const BackButton = styled.button`
  background-color: rgb(72, 160, 181);
  font-size: 1em;
  padding: 0.7em;
  color: #fff;
  border-radius: 10px;
  &:hover {
    transform: scale(1.012);
    opacity: 0.8;
  }
`;

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
    padding: 0.5em 0;
    text-align: center;
    border-radius: 5px 5px 0 0;
    border-bottom: 3px solid #eee;
  }
  form {
    display: flex;
    flex-direction: column;
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
    padding: 1.3em;
    padding-top: 0.1em;
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

class AddClient extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: ''
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const newClient = this.state;
    const { firestore, history } = this.props;
    if (newClient.balance === '') {
      newClient.balance = '0';
    }

    firestore
      .add({ collection: 'clients' }, newClient)
      .then(() => history.push('/'));
  };

  render() {
    const { disableBalanceOnAdd } = this.props.settings;
    return (
      <div
        style={{
          height: '100%'
        }}
      >
        <Link to="/">
          <BackButton>
            {' '}
            <i className="fa fa-arrow-circle-left" /> Back to Dashboard
          </BackButton>
        </Link>
        <FormContainer>
          <h1>Add Client</h1>
          <form onSubmit={this.onSubmit}>
            <div className="input-group">
              <label htmlFor="firstName">First Name: </label>
              <input
                type="text"
                name="firstName"
                minLength="2"
                required
                onChange={this.onChange}
                value={this.state.firstName}
              />
            </div>
            <div className="input-group">
              <label htmlFor="lastName">Last Name: </label>
              <input
                type="text"
                name="lastName"
                minLength="2"
                required
                onChange={this.onChange}
                value={this.state.lastName}
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                name="email"
                onChange={this.onChange}
                value={this.state.email}
              />
            </div>
            <div className="input-group">
              <label htmlFor="phone">Phone: </label>
              <input
                type="tel"
                name="phone"
                required
                onChange={this.onChange}
                value={this.state.phone}
              />
            </div>
            <div className="input-group">
              <label htmlFor="balance">Balance: </label>
              <input
                type="text"
                name="balance"
                onChange={this.onChange}
                value={this.state.balance}
                disabled={disableBalanceOnAdd}
              />
            </div>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </FormContainer>
      </div>
    );
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(),
  connect(state => ({
    settings: state.settings
  }))
)(AddClient);
