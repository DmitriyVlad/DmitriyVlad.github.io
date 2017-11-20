import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './EditableCell.scss';

import { validator } from 'Helpers/validator';
import Input from 'Components/atoms/Input';

import { classNameModifiers } from 'Helpers/component';

export default class EditableCell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      isInvalid: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(event) {
    const newValue = event.target.value;
    const { type } = this.props;
    let isValid = false;

    if (type === 'string') {
      isValid = validator.isString(newValue);
    }

    if (type === 'number') {
      isValid = validator.isNumeric(newValue);
    }

    if (!isValid) {
      this.setState({
        isInvalid: true
      });
    }
  }

  handleDoubleClick(_event) {
    this.setState({
      active: true
    });
  }

  handleBlur(event) {
    const newValue = event.target.value;
    const { active } = this.state;
    const defaultValue = event.target.defaultValue;

    if (active && defaultValue === newValue) {
      this.setState({
        active: false,
        isInvalid: false
      });
    } else if (!active && defaultValue === newValue) {
      return;
    }

    const { type, onCellChange } = this.props;
    let isValid = false;

    if (type === 'string') {
      isValid = validator.isString(newValue);
    }

    if (type === 'number') {
      isValid = validator.isNumeric(newValue);
    }

    if (!isValid) {
      this.setState({
        active: false,
        isInvalid: false
      });

      onCellChange(defaultValue);
      this.textInput.value = defaultValue;

      return;
    }

    this.setState({
      active: false,
      isInvalid: false
    });
    onCellChange(newValue);
  }

  render() {
    const classBase = 'EditableCell';
    const { theme, value } = this.props;
    const themeModifier = this.state.active ? 'active' : 'editable';
    let cell = null;

    cell =
      theme === 'head' ? (
        <th className={ classNameModifiers(classBase, theme) }>{value}</th>
      ) : (
        <td className={ classNameModifiers(classBase, theme) }>
          <Input
            type="text"
            defaultValue={ value }
            theme={ themeModifier }
            readOnly={ !this.state.active }
            isInvalid={ this.state.isInvalid }
            onChange={ this.handleChange }
            inputRef={ (input) => {
              this.textInput = input;
            } }
            onDoubleClick={ this.handleDoubleClick }
            onBlur={ this.handleBlur }
          />
        </td>
      );

    return cell;
  }
}

EditableCell.propTypes = {
  value: PropTypes.string.isRequired,
  theme: PropTypes.string,
  onCellChange: PropTypes.func,
  type: PropTypes.string.isRequired
};

EditableCell.defaultProps = {
  theme: '',
  onCellChange: null
};
