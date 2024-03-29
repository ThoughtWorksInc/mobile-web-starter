import React from 'react';
import _ from 'lodash';

import { connect } from 'react-redux'
import { Link } from 'react-router'

import Icon from 'shared/components/icon/Icon'

import AppHeader from '../components/AppHeader'
import AppContainer from '../components/AppContainer'
import AppDrawer from '../components/AppDrawer'
import AppDrawerNav from '../components/AppDrawerNav'

import UserAvatar from '../../account/containers/UserAvatar'

console.log(process.env.TEST)

const appConnect = connect(null, null, (stateProps, dispatchProps, ownProps)=> {
  return {
    currentRoute: ownProps.routes[ownProps.routes.length - 1],
    featureRoutes: ownProps.routes[0].childRoutes,
    children: ownProps.children
  }
})

class App extends React.Component {

  static propTypes = {
    currentRoute: React.PropTypes.object.isRequired,
    featureRoutes: React.PropTypes.array,
    children: React.PropTypes.node
  };

  constructor(props, context) {
    super(props, context)
    this.state = {
      drawerOpened: false
    }
  }

  _openDrawer() {
    console.log('_openDrawer')
    this.setState({
      drawerOpened: true
    })
  }

  _hideDrawer() {
    console.log('_hideDrawer')
    this.setState({
      drawerOpened: false
    })
  }

  _getNavListFromRoutes(routes) {
    return _.map(routes, (routeItem)=> {
      const component = routeItem.component

      return (
        <Link to={`/${routeItem.path}`}
              activeClassName='active'
              onClick={e=>this._hideDrawer(e)}>
          <Icon type={component.icon}/>
          {component.title}
        </Link>
      )
    })
  }

  render() {
    const currentRoute = this.props.currentRoute;
    const featureRoutes = this.props.featureRoutes;

    const component = currentRoute.component;

    return (
      <div className='App'>
        <AppHeader
          title={component.title}
          onMenuBtnClick={e => this._openDrawer(e)}/>
        <AppContainer>
          {this.props.children}
        </AppContainer>
        <AppDrawer
          open={this.state.drawerOpened}
          onCloseClick={e => this._hideDrawer(e)}>
          <UserAvatar/>
          <AppDrawerNav list={this._getNavListFromRoutes(featureRoutes)}/>
        </AppDrawer>
      </div>
    )
  }
}

export default appConnect(App)
