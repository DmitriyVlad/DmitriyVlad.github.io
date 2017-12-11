import './Input.scss';
import React from 'react';
import PropTypes from 'prop-types';

import { classNameModifiers } from 'Helpers/component';

const Input = ({ theme, isInvalid, inputRef, ...elementProps }) => {
  const classBase = 'Input';

  return (
    <input
      { ...elementProps }
      className={
        isInvalid
          ? classNameModifiers(classBase, theme, 'invalid')
          : classNameModifiers(classBase, theme)
      }
      ref={ inputRef }
    />
  );
};

Input.propTypes = {
  theme: PropTypes.string,
  isInvalid: PropTypes.bool,
  inputRef: PropTypes.func
};

Input.defaultProps = {
  theme: '',
  isInvalid: false,
  inputRef: null
};

export default Input;
