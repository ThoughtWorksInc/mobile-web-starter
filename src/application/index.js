import React from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';

import { Route, IndexRoute } from 'react-router';

import configureStore from './store/configureStore';
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

  React.render(
    <Provider store={store}>
      {()=>(
        <ReduxRouter>
          <Route path='/'
                 component={App}>
            <IndexRoute component={PageHome}/>
            {combineRoutes(modules)}
          </Route>
        </ReduxRouter>
      )}
    </Provider>,
    rootElm, ()=> {
      socket(store)
    });
}

export default application
