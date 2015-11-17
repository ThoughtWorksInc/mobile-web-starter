import store from 'store2';
import Immutable from 'immutable';
import { handleActions } from 'redux-actions'
import ActionTypes from '../constants/ActionTypes'

const STORAGE_KEY = 'account.profile';
const initialState = Immutable.fromJS(store.get(STORAGE_KEY, {}))

const profile = handleActions({

  [ActionTypes.ACCOUNT_FETCH_USER_COMPLETED]: (state, action) => {
    store.set(STORAGE_KEY, action.payload)
    return Immutable.fromJS(action.payload);
  }

}, initialState)

export default profile;
