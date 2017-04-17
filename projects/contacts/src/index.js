import React from 'react';
import { render } from 'react-dom';
import { ContactsListContainer } from './bundles/Contacts/components/ContactsList';

render(
  <ContactsListContainer />,
  document.getElementById('root')
);