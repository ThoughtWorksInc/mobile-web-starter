import ActionTypes from '../constants/ActionTypes'
import store from 'store2';

const STORAGE_KEY = 'account.profile';
const initialState = store.get(STORAGE_KEY, {})

function profile(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.ACCOUNT_FETCH_USER_COMPLETED:
      store.set(STORAGE_KEY, action.profile)
      return action.profile;
    default:
      return state;
  }
}

export default profile;