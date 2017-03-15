import React, { Component } from 'react';
import { NoteEditor } from '../NoteEditor';
import { NotesGrid } from '../NotesGrid';
import { SearchBar } from '../SearchBar';
import './NotesApp.css';

export default class NotesApp extends Component {
  constructor() {
    super();
    
    this.state = {
      notes: [],
      filterText: ''
    };

    this.handleNoteAdd = this.handleNoteAdd.bind(this);
    this.handleNoteDelete = this.handleNoteDelete.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  componentDidMount() {
    let localNotes = JSON.parse(localStorage.getItem('notes'));
    if (localNotes) this.setState({notes: localNotes});
  }

  componentDidUpdate() {
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    let notes = JSON.stringify(this.state.notes);
    localStorage.setItem('notes', notes);
  }

  handleNoteDelete(note) {
    let noteId = note.id;
    let newNotes = this.state.notes.filter(note => note.id !== noteId);

    this.setState({ notes: newNotes });
  }

  handleNoteAdd(newNote) {
    let newNotes = this.state.notes.slice();
    newNotes.unshift(newNote);

    this.setState({
      notes: newNotes
    }, this.updateLocalStorage);
  }

  handleUserInput(newText) {
    this.setState({
      filterText: newText
    });
  }

  render() {
    return (
      <div className="notes-app">
        <h2 className="app-header">Notes App</h2>
        <SearchBar 
          onUserInput={this.handleUserInput}
          filterText={this.state.filterText} 
        />
        <NoteEditor onNoteAdd={this.handleNoteAdd} />
        <NotesGrid 
          notes={this.state.notes} 
          onNoteDelete={this.handleNoteDelete}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
}