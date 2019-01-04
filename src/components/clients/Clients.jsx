import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

const addButtonStyle = {
  backgroundColor: 'rgb(72, 160, 181)',
  color: '#fff',
  padding: '0.7rem',
  textDecoration: 'none',
  borderRadius: 3,
  position: 'relative',
  top: '0',
  float: 'right',
  marginBottom: '1em'
};

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
  componentWillMount() {
    console.log(this.props);
  }
  render() {
    const { clients } = this.props;
    if (clients) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="title">
            <h2 style={{ fontSize: '2em' }}>
              <i className="fa fa-users" style={{ marginRight: '.5em' }} />
              Clients
            </h2>
          </div>
          <div className="button--container" style={{ float: 'right' }}>
            <Link to={'/'} className="add--button" style={addButtonStyle}>
              New contact
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
      return <h1>Loading...</h1>;
    }
  }
}

Clients.propTypes = {
  firestore: PropTypes.object,
  clients: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: 'clients' }]),
  connect((state, props) => ({
    clients: state.firestore.ordered.clients
  }))
)(Clients);
