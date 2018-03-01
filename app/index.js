import React from 'react'
import PropTypes from 'prop-types'
import { Platform, View } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import {
  StackNavigator,
  addNavigationHelpers,
  NavigationActions
} from 'react-navigation'
import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener
} from 'react-navigation-redux-helpers'
import { configureStore, wrapper, connected } from 'redux-container'
import { combineReducers } from 'redux'
import Navigator from './navigator'
import { fetchAuth } from './module/auth/action'
import { fetchUserPrefs, fetchMessageCount } from './module/common/action'
import reducers from './reducer'
import { isEqual } from 'lodash'
import { injectRequest } from './lib/'

import Storage from './lib/storage'
global.storage = new Storage()

injectRequest()

const navReducer = (state, action) => {
  const nextState = Navigator.router.getStateForAction(action, state)
  return nextState || state
}

const rootReducer = combineReducers({
  ...reducers,
  nav: navReducer
})

const store = configureStore(
  rootReducer,
  null,
  createReactNavigationReduxMiddleware('root', state => state.nav)
)

if (module.hot) {
  module.hot.accept('./reducer.js', () => {
    const nextReducer = require('./reducer').default
    store.replaceReducer(nextReducer)
  })
}

@wrapper(store)
@connected(
  state => ({
    root: {
      ...state.messageCountReducer,
      ...state.authReducer,
      ...state.userPrefsReducer
    },
    nav: state.nav
  }),
  { fetchAuth, fetchMessageCount, fetchUserPrefs }
)
class App extends React.Component {
  static childContextTypes = {
    userPrefs: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  }
  getChildContext() {
    const { auth, userPrefs } = this.props.root
    return { auth, userPrefs }
  }
  componentDidMount() {
    const { fetchAuth, fetchUserPrefs, fetchMessageCount } = this.props.actions
    const { auth } = this.props.root
    fetchAuth()
    fetchUserPrefs()
    if (auth.isLogined) {
      fetchMessageCount(auth.accessToken)
    }
    SplashScreen.hide()
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.root.auth.isLogined && !this.props.root.auth.isLogined) {
      this.navigator &&
        this.navigator.dispatch({ type: 'Navigate', routeName: 'home' })
    }
  }
  render() {
    return (
      <Navigator
        ref={nav => {
          this.navigator = nav
        }}
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav,
          addListener: createReduxBoundAddListener('root')
        })}
        screenProps={this.props.root}
      />
    )
  }
}

export default App
