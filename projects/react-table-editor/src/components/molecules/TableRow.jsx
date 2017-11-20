import React from 'react';
import PropTypes from 'prop-types';

import './TableRow.scss';

import { classNameModifiers } from 'Helpers/component';

const TableRow = ({ theme, children }) => {
  const classBase = 'TableRow';

  return <tr className={ classNameModifiers(classBase, theme) }>{children}</tr>;
};

TableRow.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.string
};

TableRow.defaultProps = {
  theme: ''
};

export default TableRow;
