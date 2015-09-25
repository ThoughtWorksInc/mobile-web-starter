import React from 'react'
import { connect } from 'react-redux';

@connect(state=> {
  const profile = state.account.profile
  return {
    profile
  }
})
//
class ScheduleHome extends React.Component {

  static icon = 'briefcase';
  static title = 'Schedule';

  static propTypes = {
    profile: React.PropTypes.object
  }

  render() {

    const profile = this.props.profile;

    return (
      <div>
        # { profile.username }
        ScheduleHome
      </div>
    )
  }
}

export default ScheduleHome