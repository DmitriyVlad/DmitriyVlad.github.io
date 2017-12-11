import './Button.scss';
import React from 'react';
import PropTypes from 'prop-types';

import { classNameModifiers } from 'Helpers/component';

const Button = (props) => {
  const classBase = 'Button';

  return (
    <button className={ classNameModifiers(classBase) } { ...props }>
      {props.children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired
};

export default Button;
