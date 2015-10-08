import React from 'react';
import TimeoutTransitionGroup from 'shared/components/animate/TimeoutTransitionGroup';

class AppDrawer extends React.Component {

  static propTypes = {
    open: React.PropTypes.bool,
    onCloseClick: React.PropTypes.func,
    children: React.PropTypes.node
  };

  render() {
    return (
      <TimeoutTransitionGroup enterTimeout={300}
                              leaveTimeout={300}
                              transitionName='AppDrawer'>
        {this.props.open ? (
          <div key='drawer'
               className='AppDrawer'>
            <div className='AppDrawer__bg'
                 onClick={this.props.onCloseClick}/>
            <div className='AppDrawer__contents'>
              {this.props.children}
            </div>
          </div>
        ) : null}
      </TimeoutTransitionGroup>
    )
  }

}

export default AppDrawer;
