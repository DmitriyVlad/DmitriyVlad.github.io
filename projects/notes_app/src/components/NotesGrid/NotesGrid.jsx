import React, { Component } from 'react';
import { Note } from '../Note';
import './NotesGrid.css';

export default class NotesGrid extends Component {
  componentDidMount() {
    let grid = this.grid;
    this.msnry = new Masonry( grid, {
      itemSelector: '.note',
      columnWidth: 210,
      gutter: 10,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.notes.length !== prevProps.notes.length || this.props.filterText !== prevProps.filterText) {
      this.msnry.reloadItems();
      this.msnry.layout();
    }
  }

  render() {
    let notes = [];

    if (this.props.filterText !== '') {
      notes = this.props.notes.filter(note => {
        let searchValue = note.text.toLowerCase();
        return searchValue.indexOf(this.props.filterText) !== -1;
      });
    } else {
      notes = this.props.notes;
    }

    return (
      <div 
        className="notes-grid" 
        ref={(grid) => { this.grid = grid; }}
      >
        {notes.map(note => (
          <Note 
            key={note.id} 
            color={note.color}
            onDelete={this.props.onNoteDelete.bind(null, note)}
          >
            {note.text}
          </Note>
        ))}
      </div>
    );
  }
}