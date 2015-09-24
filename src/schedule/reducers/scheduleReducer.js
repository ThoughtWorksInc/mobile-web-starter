import ActionTypes from '../constants/ActionTypes'

function schedule(state = {}, action = {}) {
  switch (action.type) {
    case ActionTypes.FETCH:
      return Object.assign({}, state, {});
    default:
      return state;
  }
}


export default schedule