import store from 'store2'
import Immutable from 'immutable'
import ActionTypes from '../constants/ActionTypes'

const STORAGE_KEY = 'schedule.schedule';
const initialState = Immutable.fromJS(store.get(STORAGE_KEY, {}))

function schedule(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.FETCH:
      return Immutable.fromJS({});
    case ActionTypes.ADD_SCHEDULE:

      let scheduleState = state.merge({
        [action.schedule.time]: action.schedule
      });


      if (scheduleState.size > 10) {
        scheduleState = scheduleState.delete(scheduleState.first().get('time'));
      }

      store.set(STORAGE_KEY, scheduleState.toJS());

      return scheduleState;

    default:
      return state;
  }
}


export default schedule
