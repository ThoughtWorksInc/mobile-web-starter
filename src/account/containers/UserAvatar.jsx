import React from 'react';
import * as accountActions from '../actions/account';

import { connect } from 'react-redux'

const userAvatarConnect = connect(state=> {
  const profile = state.getIn(['account', 'profile']).toJS()
  return {
    profile
  }
}, {
  fetchUser: accountActions.fetchUser
})

class UserAvatar extends React.Component {

  static propTypes = {
    profile: React.PropTypes.object,
    fetchUser: React.PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.fetchUser()
  }

  render() {
    const profile = this.props.profile;

    return (
      <div className='UserAvatar'>
        <span> {profile.username} #{profile.PPR}</span>
      </div>
    )
  }
}

export default userAvatarConnect(UserAvatar);
