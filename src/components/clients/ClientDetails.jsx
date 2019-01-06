import React, { Component } from 'react';
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

class ClientDetails extends Component {
  render() {
    const { client } = this.props;
    if (client) {
      return (
        <div>
          <Link to="/">
            <BackButton>
              {' '}
              <i className="fa fa-arrow-circle-left" /> Back to Dashboard
            </BackButton>
            {/* Edit and delete button group */}
          </Link>
          <h1>{client.firstName}</h1>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

export default compose(
  firestoreConnect(props => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.clients && ordered.client[0]
  }))
)(ClientDetails);
