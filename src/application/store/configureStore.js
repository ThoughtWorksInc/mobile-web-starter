import _ from 'lodash'
import Immutable from 'immutable'
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutablejs';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

function configureStore(modules = [], initialState = Immutable.fromJS({})) {
  const reducers = _.reduce(modules, (newReducers, module)=> {
    if (_.isFunction(module.reducers)) {
      newReducers [`${module.name}`] = module.reducers
    }
    return newReducers
  }, {});

  const rootReducer = combineReducers(reducers);

  const middlewares = [
    thunkMiddleware
  ];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger({
      transformer: state => state && Immutable.fromJS(state).toJS()
    }))
  }

  return applyMiddleware(...middlewares)(createStore)(rootReducer, initialState);
}

export default configureStore;
