import { combineReducers } from 'redux-immutablejs';

import profile from './reducers/profile'

export const name = 'account';
export const reducers = combineReducers({
  profile
})
