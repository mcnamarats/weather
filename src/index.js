import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import store from './store';
import App from './App';
import { API_KEY } from './config';

const root = document.getElementById('root');

/* eslint-disable no-unused-expressions */
!API_KEY
  ? ReactDOM.render(<h1>Please set your weather API key in config.js</h1>, root)
  : ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root')
    );
