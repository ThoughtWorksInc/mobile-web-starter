import { combineReducers } from 'redux';

import profile from './reducers/profile'

export const name = 'account';
export const reducers = combineReducers({
  profile
})