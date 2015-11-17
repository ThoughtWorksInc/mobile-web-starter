import { handleActions } from 'redux-actions'
import store from 'store2'
import Immutable from 'immutable'
import ActionTypes from '../constants/ActionTypes'

const STORAGE_KEY = 'schedule.schedule';
const initialState = Immutable.fromJS(store.get(STORAGE_KEY, {}))

const schedule = handleActions({

  [ActionTypes.FETCH]: ()=> {
    return Immutable.fromJS({});
  },

  [ActionTypes.ADD_SCHEDULE]: (state, action = {}) => {
    let scheduleState = state.merge({
      [action.payload.time]: action.payload
    });

    if (scheduleState.size > 10) {
      scheduleState = scheduleState.delete(scheduleState.first().get('time'));
    }

    store.set(STORAGE_KEY, scheduleState.toJS());

    return scheduleState;
  }

}, initialState);

export default schedule
