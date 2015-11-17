import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux';

const Connect = connect(state=> {
  const scheduleList = state.getIn(['schedule', 'schedule']).toList().toJS()
  return {
    scheduleList: scheduleList
  }
})

class ScheduleHome extends React.Component {

  static propTypes = {
    scheduleList: React.PropTypes.array
  }

  static icon = 'briefcase';
  static title = 'Schedule';

  render() {

    const scheduleList = this.props.scheduleList;

    return (
      <div>
        ScheduleHome
        <ol>
          {scheduleList.map((scheduleItem, idx)=> {
            return (
              <li key={idx}>
                <span>
                  {moment(parseInt(scheduleItem.time)).toISOString()}
                </span>
                :
                <span>{scheduleItem.message}</span>
              </li>
            )
          })}
        </ol>
      </div>
    )
  }
}

export default Connect(ScheduleHome)
