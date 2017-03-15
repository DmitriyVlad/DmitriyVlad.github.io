import React, { Component } from 'react';
import './SearchBar.css';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onUserInput(e.target.value);
  }
  
  render() {
    return (
     <input 
       type="text"
       className="search-field"
       placeholder="Search..."
       value={this.props.filterText}
       onChange={this.handleChange}
      /> 
    );
  }
}