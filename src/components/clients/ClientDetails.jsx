import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';
import styled from 'styled-components';

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

const ClientDetailsContainer = styled.div`
  height: 50%;
  margin-top: 4em;
  box-shadow: 0 0 15px 0 #000;
  border-radius: 5px;
  h2 {
    border-radius: 5px 5px 0px 0px;
    background-color: rgb(40, 53, 72);
    padding: 1em;
    margin: 0;
    color: #fff;
    border-bottom: 2px solid #fff;
  }
  .details-container {
    padding: 1em;
    background-color: #eee;
    height: 70%;
  }
  ul {
    padding: 0;
  }
  ul li {
    list-style-type: none;
    margin-bottom: 1em;
  }

  .text-owes {
    color: red;
    font-weight: 500;
  }
  .text-clean {
    color: green;
    font-weight: 500;
  }
`;

class ClientDetails extends Component {
  state = {
    showBalanceForm: false,
    balanceAmount: ''
  };

  deleteClient = e => {
    const { client, firestore, history } = this.props;
    firestore
      .delete({ collection: 'clients', doc: client.id })
      .then(() => history.push('/'));
  };

  submitBalance = e => {
    e.preventDefault();
    const { balanceAmount } = this.state;
    const { client, firestore } = this.props;
    const clientUpdate = { balance: balanceAmount };
    firestore.update({ collection: 'clients', doc: client.id }, clientUpdate);
  };

  render() {
    const { client } = this.props;
    const { showBalanceForm, balanceAmount } = this.state;
    const balanceForm = (
      <form onSubmit={this.submitBalance}>
        <input
          type="text"
          placeholder="Add new balance"
          value={balanceAmount}
          onChange={e => this.setState({ balanceAmount: e.target.value })}
          style={{ padding: '1em' }}
        />
        <button
          type="submit"
          style={{
            padding: '1em',
            color: '#fff',
            backgroundColor: 'rgb(72, 160, 181)',
            marginLeft: '.5em',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Update Balance
        </button>
      </form>
    );
    if (client) {
      return (
        <div>
          <Link to="/">
            <BackButton>
              {' '}
              <i className="fa fa-arrow-circle-left" /> Back to Dashboard
            </BackButton>
          </Link>
          <div className="btn-group" style={{ textAlign: 'right' }}>
            <Link to={`/client/edit/${client.id}`}>
              <button className="edit-btn" style={EditBtnStyle}>
                Edit
              </button>
            </Link>
            <button
              className="delte-btn"
              style={DeleteBtnStyle}
              onClick={this.deleteClient}
            >
              Delete
            </button>
          </div>

          <hr />
          <ClientDetailsContainer>
            <h2>
              {client.firstName} {client.lastName}
            </h2>
            <div className="details-container">
              <h3>Client Id:</h3>
              <p>{client.id}</p>
              <h3>Balance:</h3>
              <p
                className={client.balance > 0 ? 'text-owes' : 'text-clean'}
                style={{ display: 'inline-block' }}
              >
                ${parseFloat(client.balance).toFixed(2)}{' '}
              </p>
              <i
                onClick={() =>
                  this.setState({
                    showBalanceForm: !this.state.showBalanceForm
                  })
                }
                className={
                  this.state.showBalanceForm ? 'fa fa-times' : 'fa fa-edit'
                }
                style={{
                  cursor: 'pointer',
                  marginLeft: '.5em',
                  fontSize: '1.2em'
                }}
              />
              {showBalanceForm ? balanceForm : null}
              <hr />
              <ul>
                <li>
                  <strong>Email: </strong>
                  {client.email}
                </li>
                <li>
                  <strong>Phone: </strong>
                  {client.phone}
                </li>
              </ul>
            </div>
          </ClientDetailsContainer>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

const EditBtnStyle = {
  padding: '.6em 1.5em',
  backgroundColor: 'darkRed',
  color: '#fff',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '1em',
  marginRight: '.5em'
};

const DeleteBtnStyle = {
  padding: '.6em 1.5em',
  backgroundColor: '#000',
  color: '#fff',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '1em'
};

ClientDetails.propTypes = {
  firestore: PropTypes.object.isRequired
};
//gets the specified client according to the id coming from the url
export default compose(
  firestoreConnect(props => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(ClientDetails);
