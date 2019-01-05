import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';

const AddButton = styled.button`
  background-color: rgb(72, 160, 181);
  color: #fff;
  padding: 0.9rem;
  border-radius: 3px;
  float: right;
  margin-bottom: 2em;
  font-size: 1.12em;
`;

const StyledTable = styled.table`
  background-color: white;
  border-collapse: collapse;
  box-shadow: 0 0 12px 0 black;
  th {
    padding: 0.9em 0.5em;
    text-transform: uppercase;
    font-size: 0.9em;
    border-bottom: 2px solid #eee;
  }
  td {
    border-bottom: 2px solid green;
    padding: 1em;
    text-align: center;
    border-bottom: 2px solid #eee;
  }
  .details--button {
    background-color: rgb(110, 118, 127);
    color: #fff;
    padding: 0.4rem;
    text-decoration: none;
    border-radius: 3px;
    border: 1px solid rgb(110, 118, 127);
  }
  .details--button:hover {
    color: rgb(110, 118, 127);
    background-color: #fff;
    border: 1px solid rgb(110, 118, 127);
  }
`;
class Clients extends Component {
  state = {
    totalOwed: null
  };

  //calculate balance as clients come in
  static getDerivedStateFromProps(props, state) {
    const { clients } = props;
    if (clients) {
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0);
      return { totalOwed: total };
    }
  }
  render() {
    const { clients } = this.props;
    const { totalOwed } = this.state;
    if (clients) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="title">
            <h2 style={{ fontSize: '2em' }}>
              <i className="fa fa-users" style={{ marginRight: '.5em' }} />
              Clients
            </h2>
          </div>
          <h1 style={{ textAlign: 'right', marginBottom: '1em' }}>
            Total Owed:{'  '}{' '}
            <span style={{ color: 'green' }}>
              ${parseFloat(totalOwed).toFixed(2)}
            </span>
          </h1>
          <div className="button--container" style={{ float: 'right' }}>
            <Link to={'/'} className="add--button">
              <AddButton>New Client</AddButton>
            </Link>
          </div>

          <StyledTable>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>
                    {client.firstName} {client.lastName}
                  </td>
                  <td>{client.email}</td>
                  <td>${parseFloat(client.balance).toFixed(2)}</td>
                  <td>
                    <Link
                      className="details--button"
                      to={`/client/${client.id}`}
                    >
                      <i className="fa fa-plus-circle" /> Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: 'clients' }]),
  connect((state, props) => ({
    clients: state.firestore.ordered.clients
  }))
)(Clients);
