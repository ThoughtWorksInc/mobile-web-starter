import { createAction } from 'redux-actions'

import ActionTypes from '../constants/ActionTypes'

const addScheduleAction = createAction(ActionTypes.ADD_SCHEDULE)

export function addSchedule(schedule) {
  return (dispatch) => {
    return dispatch(addScheduleAction(schedule))
  }
}