import _ from 'lodash'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import createHistory from 'history/lib/createHashHistory';

import { reduxReactRouter, routerStateReducer } from 'redux-router';

function configureStore(modules = [], routes = {}, initialState = {}) {

  const reducers = _.reduce(modules, (reducers, module)=> {
    if (_.isFunction(module.reducers)) {
      reducers [`${module.name}`] = module.reducers
    }
    return reducers
  }, {});

  reducers.router = routerStateReducer;

  const rootReducer = combineReducers(reducers);

  const middlewares = [
    thunkMiddleware,
    loggerMiddleware
  ];

  return compose(
    reduxReactRouter({
      createHistory
    }),
    applyMiddleware(...middlewares)
  )(createStore)(rootReducer, initialState);

}


export default configureStore;