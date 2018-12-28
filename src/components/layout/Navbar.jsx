import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: rgb(40, 53, 72);
  height: 100vh;
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
    transform: translateX(-2em);
    margin-left: -1em;
    margin-top: 2em;
  }
  #navbarMain li {
    list-style-type: none;
    transform: translateX(-1em);
  }
  a {
    color: white;
    text-decoration: none;
    font-size: 1.2em;
  }
`;

class Navbar extends Component {
  render() {
    return (
      <Nav>
        <Link to="/" className="link">
          Payaneer
        </Link>
        {/* <button
            type="button"
            data-toggle="collapse"
            data-target="#navbarMain"
          /> */}
        <div id="navbarMain">
          <ul>
            <li>
              <Link to="/">
                <i class="fa fa-book" style={{ marginRight: '.5em' }} />
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </Nav>
    );
  }
}

export default Navbar;
