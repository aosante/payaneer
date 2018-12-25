import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
      }
    ];
    if (clients) {
      return (
        <div>
          <div className="container">
            <div className="section-1">
              <h2>Clients</h2>
            </div>
            <div className="section-2" />
          </div>
          <table>
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
                    <Link to={`/client/${client.id}`}>button</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }
}

export default Clients;
