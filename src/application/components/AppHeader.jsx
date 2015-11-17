import React from 'react';

import Icon from 'shared/components/icon/Icon';

class AppHeader extends React.Component {

  static propTypes = {
    title: React.PropTypes.node,
    onMenuBtnClick: React.PropTypes.func
  };

  render() {
    return (
      <div className='AppHeader'>
        <h1 className='AppHeader__title'>
          {this.props.title}
        </h1>
        <div className='AppHeader__btn'
             onClick={e => this.props.onMenuBtnClick(e)}>
          <Icon type='menu'/>
        </div>
      </div>
    )
  }

}

export default AppHeader