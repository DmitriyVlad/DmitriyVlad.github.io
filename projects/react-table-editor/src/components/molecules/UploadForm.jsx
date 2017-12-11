import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './UploadForm.scss';

import Input from 'Components/atoms/Input';
import Button from 'Components/atoms/Button';
import ErrorMessage from 'Components/atoms/ErrorMessage';
import { validator, errorMessages } from 'Helpers/validator';
import { getFileExtension } from 'Helpers/utility';

import { classNameElement, classNameModifiers } from 'Helpers/component';

export default class UploadForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null
    };

    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFileUpload(event) {
    event.preventDefault();

    const files = event.target.files;
    const selectedFile = files[0];
    const { onError } = this.props;

    if (files.length === 0) {
      onError(true, errorMessages.fileNotSelected);

      return;
    }

    const isValidType = validator.isCSV(getFileExtension(selectedFile.name));

    if (!isValidType) {
      onError(true, errorMessages.invalidType);

      return;
    }

    if (!validator.validateSize(selectedFile.size)) {
      onError(true, errorMessages.sizeExceeded);

      return;
    }

    if (!window.FileReader) {
      onError(true, errorMessages.fileReader);

      return;
    }

    onError(false, '');

    this.setState({
      file: selectedFile
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { hasError, onError } = this.props;
    const { file } = this.state;

    if (!file) {
      onError(true, errorMessages.fileNotSelected);

      return;
    }

    if (hasError) return;

    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      onError(false, '');

      this.props.onSubmit(reader.result);
    };
  }

  render() {
    const classBase = 'UploadForm';
    const { hasError, errorText } = this.props;

    return (
      <form className={ classNameModifiers(classBase) } onSubmit={ this.handleSubmit } id="upload_form">
        <div className={ classNameElement(classBase, 'row') }>
          <label htmlFor="incomes_upload" className={ classNameElement(classBase, 'label') }>
            Choose <b>csv</b> file to upload:
          </label>
          <Input
            type="file"
            name="incomes_upload"
            id="incomes_upload"
            accept=".csv"
            required
            onChange={ this.handleFileUpload }
          />
          {hasError && <ErrorMessage errorText={ errorText } />}
        </div>
        <div className={ classNameElement(classBase, 'row') }>
          <Button>Submit</Button>
        </div>
      </form>
    );
  }
}

UploadForm.propTypes = {
  onSubmit: PropTypes.func,
  onError: PropTypes.func,
  hasError: PropTypes.bool,
  errorText: PropTypes.string
};

UploadForm.defaultProps = {
  onSubmit: null,
  onError: null,
  hasError: false,
  errorText: ''
};
