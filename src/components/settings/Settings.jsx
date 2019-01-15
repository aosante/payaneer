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
  height: 100%;
  .container {
    box-shadow: 0 0 15px 0 #000;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    top: 3em;
    border-radius: 5px;
    background-color: #eee;
  }
  .container h2 {
    border-radius: 5px 5px 0px 0px;
    background-color: rgb(40, 53, 72);
    padding: 1em 0;
    padding-left: 0.8em;
    margin: 0;
    color: #fff;
    border-bottom: 2px solid #fff;
    width: 98.5%;
  }
  .container form {
    padding: 1em;
    width: 97%;
  }
  .container form .form-group {
    border-bottom: 2px solid #eaeaea;
    padding: 1em;
  }
  .container form .form-group:last-child {
    border-bottom: none;
  }
  .container form .form-group input {
    font-size: 15em;
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
          <h2>Edit Settings</h2>
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
