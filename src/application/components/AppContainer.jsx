import React from 'react';

class AppContainer extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  };

  render() {
    return (
      <div className='AppContainer'>
        {this.props.children}
      </div>
    )
  }

}

export default AppContainer