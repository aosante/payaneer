import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const addButtonStyle = {
  backgroundColor: 'rgb(110, 118, 127)',
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
  }
`;
//110, 118, 127
class Clients extends Component {
  render() {
    const clients = [
      {
        id: '1',
        firstName: 'Kevin',
        lastName: 'Johnson',
        email: 'kj@gmail.com',
        phone: '444-444-4444',
        balance: '100'
      },
      {
        id: '2',
        firstName: 'Amelia',
        lastName: 'Hunt',
        email: 'ah@gmail.com',
        phone: '888-888-8888',
        balance: '130'
      }
    ];
    if (clients) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="title">
            <h2>
              <i class="fa fa-users" style={{ marginRight: '1em' }} />
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

export default Clients;
