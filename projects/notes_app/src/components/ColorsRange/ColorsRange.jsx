import React, { Component } from 'react';
import { ColorElement } from '../ColorElement';
import './ColorsRange.css';

export default class ColorsRange extends Component {
  constructor(props) {
    super(props);

    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleColorChange(event) {
    this.props.onColorChange(event.target.value);
  }
  
  render() {
    const COLORS = ['Tomato', 'Orange', 'Yellow', 'PaleGreen', 'SkyBlue', 'RoyalBlue', 'MediumOrchid'];

    return (
      <div 
        className="colors" 
        onChange={this.handleColorChange}
      >
        {COLORS.map(color => (
          <ColorElement 
            color={color} 
            key={'id-' + color} 
          />
        ))}
      </div>
    );
  }
}
