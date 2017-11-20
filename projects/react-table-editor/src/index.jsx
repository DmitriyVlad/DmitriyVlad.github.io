import 'babel-polyfill';
import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

if (module.hot) {
  module.hot.accept();
}

const mountNode = document.getElementById('root');

if (typeof window !== 'undefined' && mountNode) {
  ReactDOM.render(<App />, mountNode);
}
