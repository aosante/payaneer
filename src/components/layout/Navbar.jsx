import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

class Navbar extends Component {
  render() {
    return (
      <nav>
        <div className="container">
          <Link to="/" className="link">
            Client Panel
          </Link>
          <button
            type="button"
            data-toggle="collapse"
            data-target="#navbarMain"
          />
          <div id="#navbarMain">
            <ul>
              <li>
                <Link to="/">Dashboard</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
