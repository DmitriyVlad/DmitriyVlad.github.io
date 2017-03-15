import React, { Component } from 'react';
import './ColorElement.css';

export default class ColorElement extends Component {
  render() {
    let style = {
      backgroundColor: this.props.color
    };
    
    return (
      <div className="color">
        <input 
          type="radio" 
          name="color"
          className="color-input"
          value={this.props.color}
          id={this.props.color}
        />
        <label 
          htmlFor={this.props.color} 
          style={style} 
          className="color-label" 
        />
      </div>
    );
  }
}