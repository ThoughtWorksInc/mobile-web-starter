import React from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';

import { Route, IndexRoute } from 'react-router';

import configureStore from './store/configureStore';
import combineRoutes from './helpers/combineRoutes'

import App from './containers/App';
import PageHome from './containers/PageHome';

const modules = [
  require('../schedule'),
  require('../swap-board')
];

function application(rootElm) {
  React.render(
    <Provider store={configureStore(modules)}>
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
    rootElm
  );
}

export default application
