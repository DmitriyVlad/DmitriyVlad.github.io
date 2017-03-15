import React, { Component } from 'react';
import { ColorsRange } from '../ColorsRange';
import './NoteEditor.css';

export default class NoteEditor extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      text: '',
      color: 'Yellow'
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleTextChange(event) {
    this.setState({
      text: event.target.value
    });
  }

  handleClick() {
    let newNote = {
      text: this.state.text,
      color: this.state.color,
      id: Date.now()
    }

    this.props.onNoteAdd(newNote);
    this.setState({
      text: ''
    });
  }

  handleColorChange(color) {
    this.setState({
      color
    });
  }

  render() {
    return (
      <div className="note-editor">
        <textarea 
          placeholder="Enter your note here..." 
          rows="4" 
          className="textarea"
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <div className="note-editor__footer">
          <ColorsRange onColorChange={this.handleColorChange} />
          <button 
            className="add-button"
            onClick={this.handleClick}
          >
            Add
          </button>
        </div>
      </div>
    );
  }
}