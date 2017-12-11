import React from 'react';
import PropTypes from 'prop-types';
import './ErrorMessage.scss';

import { classNameModifiers } from 'Helpers/component';

const ErrorMessage = ({ errorText }) => {
  const classBase = 'ErrorMessage';

  return <p className={ classNameModifiers(classBase) }>{errorText}</p>;
};

ErrorMessage.propTypes = {
  errorText: PropTypes.string.isRequired
};

export default ErrorMessage;
