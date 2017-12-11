import React from 'react';
import PropTypes from 'prop-types';

import './Table.scss';

import TableRow from 'Components/molecules/TableRow';
import EditableCell from 'Components/molecules/EditableCell';

import { getSum, getAverageValue } from 'Helpers/utility';
import { classNameElement, classNameModifiers } from 'Helpers/component';

const Table = ({ data, onCellChange }) => {
  const classBase = 'Table';
  const rows = [];
  let numValues = [];
  let headRow = null;

  for (let i = 0; i < data.length; i += 1) {
    if (i === 0) {
      headRow = (
        <TableRow theme="head" key={ data[i][0] }>
          <EditableCell theme="head" value={ data[i][0] } type="string" />
          <EditableCell theme="head" value={ data[i][1] } type="string" />
        </TableRow>
      );
    } else {
      rows.push(
        <TableRow key={ data[i][0] }>
          <EditableCell value={ data[i][0] } onCellChange={ onCellChange(i, 0) } type="string" />
          <EditableCell value={ data[i][1] } onCellChange={ onCellChange(i, 1) } type="number" />
        </TableRow>
      );
      numValues.push(data[i][1]);
    }
  }

  numValues = numValues.map(value => +value);

  return (
    <table className={ classNameModifiers(classBase) }>
      <thead className={ classNameElement(classBase, 'head') }>{headRow}</thead>
      <tfoot className={ classNameElement(classBase, 'foot') }>
        <TableRow theme="foot">
          <td className={ classNameElement(classBase, 'col') }>Sum:</td>
          <td className={ classNameElement(classBase, 'col') }>{getSum(numValues)}</td>
        </TableRow>
        <TableRow theme="foot">
          <td className={ classNameElement(classBase, 'col') }>Average:</td>
          <td className={ classNameElement(classBase, 'col') }>{getAverageValue(numValues)}</td>
        </TableRow>
      </tfoot>
      <tbody className={ classNameElement(classBase, 'body') }>{rows}</tbody>
    </table>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  onCellChange: PropTypes.func
};

Table.defaultProps = {
  onCellChange: null
};

export default Table;
