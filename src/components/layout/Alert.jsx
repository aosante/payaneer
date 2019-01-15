import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AlertComponent = styled.div`
  padding: 1em;
  font-size: 0.67em;
  margin-top: 10em;
  text-align: center;
  /*Error class*/
  .error {
    background-color: rgba(246, 36, 89, 0.4);
    border: 1px solid red;
    padding: 1em;
    border-radius: 5px;
  }
  /* Succes class */
  .success {
    background-color: rgba(0, 230, 64, 0.4);
    border: 1px solid green;
    padding: 1em;
    border-radius: 5px;
  }
`;

const Alert = props => {
  const { message, messageType } = props;
  let className = '';
  if (messageType === 'error') {
    className = 'error';
  } else if (messageType === 'success') {
    className = 'success';
  }
  return (
    <AlertComponent>
      <h1 className={className}>{message}</h1>
    </AlertComponent>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired
};

export default Alert;
