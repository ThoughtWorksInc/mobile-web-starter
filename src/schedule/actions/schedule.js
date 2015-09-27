import ActionTypes from '../constants/ActionTypes'

export function addSchedule(schedule) {
  return (dispatch) => {
    return dispatch({
      type: ActionTypes.ADD_SCHEDULE,
      schedule: schedule
    })
  }
}