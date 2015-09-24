import React from 'react'
import classNames from 'classnames'

import IconTypes from './constants/IconTypes'

const PropTypes = React.PropTypes

class Icon extends React.Component {

  static propTypes = {
    type: PropTypes.oneOf(IconTypes).isRequired
  }

  render() {
    const { type } = this.props;
    return (
      <i className={classNames('icon', {
        [`icon--${type}`]:type
      })}/>
    )
  }
}


export default Icon