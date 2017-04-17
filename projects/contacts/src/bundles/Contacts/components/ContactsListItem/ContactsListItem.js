import React, { Component } from 'react';

export default class ContactsListItem extends Component {
  render() {
    const { contact } = this.props;

    return (
      <li className="contact" key={contact.id}>
        <img className="contact-image" src={contact.image} width="60px" height="60px"/>
        <div className="contact-info">
          <div className="contact-name" >{contact.name}</div>
          <div className="contact-number">{contact.phoneNumber}</div>
        </div>
      </li>
    );
  }
}

