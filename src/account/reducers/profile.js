import ActionTypes from '../constants/ActionTypes'
import store from 'store2';
import Immutable from 'immutable';

const STORAGE_KEY = 'account.profile';
const initialState = Immutable.fromJS(store.get(STORAGE_KEY, {}))

function profile(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.ACCOUNT_FETCH_USER_COMPLETED:
      store.set(STORAGE_KEY, action.profile)
      return Immutable.fromJS(action.profile);
    default:
      return state;
  }
}

export default profile;
