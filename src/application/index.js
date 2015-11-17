import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';

import configureStore from './store/configureStore';
import createHistory from 'history/lib/createHashHistory';

import combineRoutes from './helpers/combineRoutes'
import socket from '../socket'

import App from './containers/App';
import PageHome from './containers/PageHome';

const modules = [
  require('../account'),
  require('../schedule'),
  require('../swap-board')
];

function application(rootElm) {
  const store = configureStore(modules)

  ReactDOM.render(
    <Provider store={store}>
      <Router history={createHistory()}>
        <Route path='/'
               component={App}>
          <IndexRoute component={PageHome}/>
          {combineRoutes(modules)}
        </Route>
      </Router>
    </Provider>,
    rootElm, ()=> {
      socket(store)
    });
}

export default application
