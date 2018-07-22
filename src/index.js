import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import { API_KEY } from './config';

const root = document.getElementById('root');

/* eslint-disable no-unused-expressions */
!API_KEY
  ? ReactDOM.render(<h1>Please set your weather API key in config.js</h1>, root)
  : ReactDOM.render(<App />, document.getElementById('root'));
