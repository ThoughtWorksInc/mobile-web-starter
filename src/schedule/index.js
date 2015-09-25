import React from 'react';
import { Route } from 'react-router';
import { combineReducers } from 'redux';

import ScheduleHome from './containers/ScheduleHome'

import scheduleReducer from './reducers/scheduleReducer'

export const components = {
  ScheduleHome: ScheduleHome
}

export const name = 'schedule'

export const routes = (
  <Route path='schedule'
         component={ScheduleHome}/>
);

export const reducers = combineReducers({
  scheduleReducer
})