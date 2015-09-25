import React from 'react';
import { Link } from 'react-router'



class PageHome extends React.Component {

  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to='/schedule'>
              Schedule
            </Link>
          </li>
          <li>
            <Link to='/swap-board'>
              Swap Board
            </Link>
          </li>
        </ul>
      </div>
    )
  }

}

export default PageHome