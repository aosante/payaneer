import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  setAllowRegistration,
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit
} from '../../actions/settingsActions';
import styled from 'styled-components';

//styled components
const SettingsComponent = styled.div`
  border: 2px solid red;
  .container {
    border: 2px solid purple;
  }
`;

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

class Settings extends Component {
  allowRegistrationChange = () => {
    const { setAllowRegistration } = this.props;
    setAllowRegistration();
  };

  disableBalanceOnAddChange = () => {
    const { setDisableBalanceOnAdd } = this.props;
    setDisableBalanceOnAdd();
  };

  disableBalanceOnEditChange = () => {
    const { setDisableBalanceOnEdit } = this.props;
    setDisableBalanceOnEdit();
  };

  render() {
    const {
      allowRegistration,
      disableBalanceOnAdd,
      disableBalanceOnEdit
    } = this.props.settings;

    return (
      <SettingsComponent>
        <Link to="/">
          <BackButton>
            {' '}
            <i className="fa fa-arrow-circle-left" /> Back to Dashboard
          </BackButton>
        </Link>
        <div className="container">
          <h1>Edit Settings</h1>
          <form>
            <div className="form-group">
              <label htmlFor="allowRegistration">Allow Registration</label>
              <input
                type="checkbox"
                name="allowRegistration"
                checked={!!allowRegistration}
                onChange={this.allowRegistrationChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="disableBalanceOnAdd">
                Disable Balance on Add
              </label>
              <input
                type="checkbox"
                name="disableBalanceOnAdd"
                checked={!!disableBalanceOnAdd}
                onChange={this.disableBalanceOnAddChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="disableBalanceOnEdit">
                Disable Balance on Edit
              </label>
              <input
                type="checkbox"
                name="disableBalanceOnEdit"
                checked={!!disableBalanceOnEdit}
                onChange={this.disableBalanceOnEditChange}
              />
            </div>
          </form>
        </div>
      </SettingsComponent>
    );
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  setAllowRegistration: PropTypes.func.isRequired,
  setDisableBalanceOnAdd: PropTypes.func.isRequired,
  setDisableBalanceOnEdit: PropTypes.func.isRequired
};

export default connect(
  state => ({
    auth: state.firebase.auth,
    settings: state.settings
  }),
  {
    setAllowRegistration,
    setDisableBalanceOnAdd,
    setDisableBalanceOnEdit
  }
)(Settings);
