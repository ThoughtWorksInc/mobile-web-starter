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


@connect(state => {

  const routes = state.router.routes;

  return {
    currentRoute: routes[state.router.routes.length - 1],
    featureRoutes: routes[1].childRoutes
  }

}) class App extends React.Component {

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
    this.setState({
      drawerOpened: true
    })
  }

  _hideDrawer() {
    this.setState({
      drawerOpened: false
    })
  }

  _getNavListFromRoutes(routes) {
    return _.map(routes, (routeItem)=> {
      return (
        <Link to={`/${routeItem.path}`}
              activeClassName='active'
              onClick={e=>this._hideDrawer(e)}>
          <Icon type={routeItem.component.icon}/>
          {routeItem.component.title}
        </Link>
      )
    })
  }

  render() {

    const currentRoute = this.props.currentRoute;
    const featureRoutes = this.props.featureRoutes;

    return (
      <div className='App'>
        <AppHeader
          title={currentRoute.component.title}
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

export default App