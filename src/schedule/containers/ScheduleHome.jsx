import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux';

@connect(state=> {
  const scheduleList = Object.values(state.schedule.schedule)
  return {
    scheduleList
  }
})
//
class ScheduleHome extends React.Component {

  static icon = 'briefcase';
  static title = 'Schedule';

  static propTypes = {
    scheduleList: React.PropTypes.array
  }

  render() {

    const scheduleList = this.props.scheduleList;

    return (
      <div>
        ScheduleHome
        <ul>
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
        </ul>
      </div>
    )
  }
}

export default ScheduleHome