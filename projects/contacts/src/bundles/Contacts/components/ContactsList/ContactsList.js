import React, { Component } from 'react';
import { ContactsListItemContainer } from '../ContactsListItem'

export default class ContactsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedContacts: this.props.contacts
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    let searchQuery = e.target.value.toLowerCase();
    console.log(searchQuery);
    let displayedContacts = this.props.contacts.filter(elem => {
      let searchValue = elem.name.toLowerCase().trim();
      return searchValue.indexOf(searchQuery) !== -1;
    });

    this.setState({
      displayedContacts
    });
  }
  
  render() {
    const { contacts } = this.props;

    return (
      <div className="contacts">
        <input type="text" className="search-field" onChange={this.handleSearch}/>
        <ul className="contacts-list">
          {this.state.displayedContacts.map(elem => 
            <ContactsListItemContainer 
              key={elem.id} 
              contact={elem} 
            />
          )}
        </ul>
      </div>
    );
  }
}