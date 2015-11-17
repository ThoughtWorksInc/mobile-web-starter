import { createAction } from 'redux-actions'
import accountApi from 'shared/apis/account'

import ActionTypes from '../constants/ActionTypes'

const fetchUserCompletedAction = createAction(ActionTypes.ACCOUNT_FETCH_USER_COMPLETED)
const fetchUserFailedAction = createAction(ActionTypes.ACCOUNT_FETCH_USER_FAILED)

export function fetchUser() {
  return (dispatch, getState) => {

    if (getState().getIn(['account', 'profile']).username) {
      return;
    }

    return accountApi.fetchUser()
      .then(res => res.json())
      .then(res => dispatch(fetchUserCompletedAction(res)))
      .catch(err => dispatch(fetchUserFailedAction(new Error(err))))
  }
}
