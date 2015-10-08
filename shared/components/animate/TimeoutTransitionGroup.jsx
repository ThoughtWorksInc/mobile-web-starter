/**
 * copy from https://github.com/Khan/react-components/blob/master/js/timeout-transition-group.jsx
 */

import React from 'react';
import ReactTransitionGroup from  'react-addons-transition-group';
import TimeoutTransitionGroupChild from './TimeoutTransitionGroupChild';

const TimeoutTransitionGroup = React.createClass({

  propTypes: {
    enterTimeout: React.PropTypes.number.isRequired,
    leaveTimeout: React.PropTypes.number.isRequired,
    transitionName: React.PropTypes.string.isRequired,
    transitionEnter: React.PropTypes.bool,
    transitionLeave: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      transitionEnter: true,
      transitionLeave: true
    };
  },

  _wrapChild: function (child) {
    return (
      <TimeoutTransitionGroupChild
        {...this.props}
        enterTimeout={this.props.enterTimeout}
        leaveTimeout={this.props.leaveTimeout}
        name={this.props.transitionName}
        enter={this.props.transitionEnter}
        leave={this.props.transitionLeave}>
        {child}
      </TimeoutTransitionGroupChild>
    );
  },

  render: function () {
    return (
      <ReactTransitionGroup
        {...this.props}
        childFactory={this._wrapChild}/>
    );
  }
});

export default TimeoutTransitionGroup;
