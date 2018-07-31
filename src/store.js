import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './module';

/* eslint-disable no-underscore-dangle */
const reduxDevMiddleware =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export default createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    reduxDevMiddleware
  )
);
