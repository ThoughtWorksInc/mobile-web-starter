import store from 'store2'
import ActionTypes from '../constants/ActionTypes'


const STORAGE_KEY = 'schedule.schedule';
const initialState = store.get(STORAGE_KEY, {})

function schedule(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.FETCH:
      return {};
    case ActionTypes.ADD_SCHEDULE:
      const scheduleState = Object.assign({}, state, {[action.schedule.time]: action.schedule});

      const keys = Object.keys(scheduleState);
      if (keys.length > 10) {
        delete scheduleState[keys[0]];
      }

      store.set(STORAGE_KEY, scheduleState);

      return scheduleState;
    default:
      return state;
  }
}


export default schedule