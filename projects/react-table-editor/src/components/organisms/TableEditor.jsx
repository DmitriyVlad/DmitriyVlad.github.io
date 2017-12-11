import React, { Component } from 'react';

import './TableEditor.scss';

import UploadForm from 'Components/molecules/UploadForm';
import Table from 'Components/molecules/Table';

import { validator, errorMessages } from 'Helpers/validator';
import { classNameElement, classNameModifiers } from 'Helpers/component';

export default class TableEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      errorText: '',
      data: []
    };

    this.handleFileSubmit = this.handleFileSubmit.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleCellChange = this.handleCellChange.bind(this);
    this.parseCSV = this.parseCSV.bind(this);
  }

  handleError(hasError, errorText) {
    this.setState({
      hasError,
      errorText
    });
  }

  handleCellChange(rowIndex, colIndex) {
    return (value) => {
      const { data } = this.state;
      data[rowIndex][colIndex] = value;

      this.setState({
        data
      });
    };
  }

  handleFileSubmit(csvText) {
    this.parseCSV(csvText);
  }

  parseCSV(csvText) {
    const csvRows = csvText.split(/\r?\n|\r/);
    const rows = [];

    for (let i = 0; i < csvRows.length; i += 1) {
      const cells = csvRows[i].split(',');

      if (cells.length !== 2) {
        this.setState({
          hasError: true,
          errorText: errorMessages.invalidStructure
        });

        return;
      }

      for (let j = 0; j < cells.length; j += 1) {
        if (i === 0) {
          if (!validator.isString(cells[j])) {
            this.setState({
              hasError: true,
              errorText: errorMessages.invalidDataType
            });

            return;
          }
        } else {
          if (j === 0 && !validator.isString(cells[j])) {
            this.setState({
              hasError: true,
              errorText: errorMessages.invalidDataType
            });

            return;
          }

          if (j === 1 && !validator.isNumeric(cells[j])) {
            this.setState({
              hasError: true,
              errorText: errorMessages.invalidDataType
            });

            return;
          }
        }
      }

      rows.push(cells);
    }

    this.setState({
      data: rows
    });
  }

  render() {
    const classBase = 'TableEditor';
    const { hasError, errorText, data } = this.state;

    return (
      <div className={ classNameModifiers(classBase) }>
        <header className={ classNameElement(classBase, 'header') }>
          <h1 className={ classNameElement(classBase, 'title') }>Table Editor App</h1>
        </header>
        <div className={ classNameElement(classBase, 'form') }>
          <UploadForm
            onSubmit={ this.handleFileSubmit }
            onError={ this.handleError }
            hasError={ hasError }
            errorText={ errorText }
          />
        </div>
        <div className={ classNameElement(classBase, 'table-view') }>
          {!hasError && data.length ? (
            <Table data={ data } onCellChange={ this.handleCellChange } />
          ) : (
            <p className={ classNameElement(classBase, 'tip') }>Table data will be here.</p>
          )}
        </div>
      </div>
    );
  }
}
