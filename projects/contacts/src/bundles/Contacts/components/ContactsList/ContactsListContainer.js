import React from 'react';
import ContactsList from './ContactsList';

const mockData = [
  {
    id: 1,
    name: 'Darth Vader',
    phoneNumber: '+250966666666',
    image: 'http://cs7.pikabu.ru/images/big_size_comm_an/2014-03_7/13962622876915.gif'
  },
  {
    id: 2,
    name: 'Princess Leia',
    phoneNumber: '+250966344466',
    image: 'http://cs7.pikabu.ru/images/big_size_comm_an/2014-03_7/13962622876915.gif'
  },
  {
    id: 3,
    name: 'Luke Skywalker',
    phoneNumber: '+250931255655',
    image: 'http://cs7.pikabu.ru/images/big_size_comm_an/2014-03_7/13962622876915.gif'
  },
  {
    id: 4,
    name: 'Chewbacca',
    phoneNumber: '+250913325250',
    image: 'http://cs7.pikabu.ru/images/big_size_comm_an/2014-03_7/13962622876915.gif'
  }
];

export default () => <ContactsList contacts={mockData} />;