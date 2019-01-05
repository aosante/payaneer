import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

class AddClient extends Component {
  render() {
    return (
      <div style={{ border: '2px solid purple', height: '100%' }}>
        <Link to="/">
          <BackButton>
            {' '}
            <i className="fa fa-arrow-circle-left" /> Back to Dashboard
          </BackButton>
        </Link>
        <div className="form-container" style={{ border: '2px solid red' }}>
          <h1>Add Client</h1>
          <form action="">
            <div className="input-group">
              <label htmlFor="">Name: </label>
              <input type="text" />
            </div>
            <div className="input-group">
              <label htmlFor="">Email: </label>
              <input type="text" />
            </div>
            <div className="input-group">
              <label htmlFor="">Balance: </label>
              <input type="text" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddClient;
