import React from 'react'
import ReactDOM from 'react-dom'

const TICK = 17;
const endEvents = [];

const EVENT_NAME_MAP = {

  transitionend: {
    'transition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'mozTransitionEnd',
    'OTransition': 'oTransitionEnd',
    'msTransition': 'MSTransitionEnd'
  },

  animationend: {
    'animation': 'animationend',
    'WebkitAnimation': 'webkitAnimationEnd',
    'MozAnimation': 'mozAnimationEnd',
    'OAnimation': 'oAnimationEnd',
    'msAnimation': 'MSAnimationEnd'
  }
};

function animationSupported() {
  return endEvents.length !== 0;
}

function hasClass(element, className) {
  if (element.classList) {
    return element.classList.contains(className);
  }
  return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}

function addClass(element, className) {
  if (element.classList) {
    element.classList.add(className);
  } else if (!hasClass(element, className)) {
    element.className = element.className + ' ' + className;
  }
  return element;
}

function removeClass(element, className) {
  if (hasClass(className)) {
    if (element.classList) {
      element.classList.remove(className);
    } else {
      element.className = (' ' + element.className + ' ')
        .replace(' ' + className + ' ', ' ').trim();
    }
  }
  return element;
}

(function detectEvents() {
  if (typeof window === 'undefined') {
    return;
  }

  const testEl = document.createElement('div');
  const style = testEl.style;

  // On some platforms, in particular some releases of Android 4.x, the
  // un-prefixed 'animation' and 'transition' properties are defined on the
  // style object but the events that fire will still be prefixed, so we need
  // to check if the un-prefixed events are useable, and if not remove them
  // from the map
  if (!('AnimationEvent' in window)) {
    delete EVENT_NAME_MAP.animationend.animation;
  }

  if (!('TransitionEvent' in window)) {
    delete EVENT_NAME_MAP.transitionend.transition;
  }

  for (const baseEventName in EVENT_NAME_MAP) {
    if (EVENT_NAME_MAP.hasOwnProperty(baseEventName)) {
      const baseEvents = EVENT_NAME_MAP[baseEventName];
      for (const styleName in baseEvents) {
        if (styleName in style) {
          endEvents.push(baseEvents[styleName]);
          break;
        }
      }
    }
  }
})();


const TimeoutTransitionGroupChild = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    enter: React.PropTypes.bool,
    leave: React.PropTypes.bool,
    children: React.PropTypes.node,
    enterTimeout: React.PropTypes.number.isRequired,
    leaveTimeout: React.PropTypes.number.isRequired,
    transitionName: React.PropTypes.string.isRequired,
    transitionEnter: React.PropTypes.bool,
    transitionLeave: React.PropTypes.bool
  },

  componentWillMount() {
    this.classNameQueue = [];
  },

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
  },

  componentWillEnter(done) {
    if (this.props.enter) {
      this.transition('enter', done);
    } else {
      done();
    }
  },

  componentWillLeave(done) {
    if (this.props.leave) {
      this.transition('leave', done);
    } else {
      done();
    }
  },

  transition(animationType, finishCallback) {
    const node = ReactDOM.findDOMNode(this);
    const className = this.props.name + '-' + animationType;
    const activeClassName = className + '-active';

    const endListener = () => {
      removeClass(node, className);
      removeClass(node, activeClassName);

      // Usually this optional callback is used for informing an owner of
      // a leave animation and telling it to remove the child.
      if (finishCallback) {
        finishCallback();
      }
    };

    if (!animationSupported()) {
      endListener();
    } else {
      if (animationType === 'enter') {
        this.animationTimeout = setTimeout(endListener,
          this.props.enterTimeout);
      } else if (animationType === 'leave') {
        this.animationTimeout = setTimeout(endListener,
          this.props.leaveTimeout);
      }
    }

    addClass(node, className);

    // Need to do this to actually trigger a transition.
    this.queueClass(activeClassName);
  },

  queueClass(className) {
    this.classNameQueue.push(className);

    if (!this.timeout) {
      this.timeout = setTimeout(this.flushClassNameQueue, TICK);
    }
  },

  flushClassNameQueue() {
    if (this.isMounted()) {
      this.classNameQueue.forEach((name) => {
        addClass(ReactDOM.findDOMNode(this), name);
      });
    }
    this.classNameQueue.length = 0;
    this.timeout = null;
  },

  render() {
    return React.Children.only(this.props.children);
  }
});


export default TimeoutTransitionGroupChild