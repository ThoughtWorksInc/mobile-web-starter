import React from 'react';
import _ from 'lodash';

class AppDrawerNav extends React.Component {

  static propTypes = {
    list: React.PropTypes.arrayOf(
      React.PropTypes.node
    )
  }

  render() {
    if (this.props.list) {
      return (
        <ul className='AppDrawerNav'>
          {_.map(this.props.list, (node, idx)=> {
            return (
              <li className='AppDrawerNav__item'
                  key={idx}>
                {node}
              </li>
            )
          })}
        </ul>
      )
    }
    return null;
  }
}

export default AppDrawerNav