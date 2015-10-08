import _ from 'lodash'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

function configureStore(modules = [], routes = {}, initialState = {}) {

  const reducers = _.reduce(modules, (reducers, module)=> {
    if (_.isFunction(module.reducers)) {
      reducers [`${module.name}`] = module.reducers
    }
    return reducers
  }, {});

  const rootReducer = combineReducers(reducers);

  const middlewares = [
    thunkMiddleware
  ];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger())
  }

  return applyMiddleware(...middlewares)(createStore)(rootReducer, initialState);

}


export default configureStore;
