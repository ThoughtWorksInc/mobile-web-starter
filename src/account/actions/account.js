import accountApi from 'shared/apis/account'

import ActionTypes from '../constants/ActionTypes'

export function fetchUser() {
  return (dispatch, getState) => {

    if (getState().getIn(['account', 'profile']).username) {
      return;
    }

    return accountApi.fetchUser()
      .then(res => res.json())
      .then(res => dispatch({
        type: ActionTypes.ACCOUNT_FETCH_USER_COMPLETED,
        profile: res
      }))
      .catch(err => dispatch({
        type: ActionTypes.ACCOUNT_FETCH_USER_FAILED,
        err: err
      }))
  }
}
