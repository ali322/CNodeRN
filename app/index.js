import React, { PropTypes } from 'react'
import { Platform,View } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { StackNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation'
import { configureStore, wrapper, connected } from 'redux-container'
import { combineReducers } from 'redux'
import AppNavigator from './route'
import { fetchAuth } from './module/auth/action'
import { fetchUserPrefs, fetchMessageCount } from './module/common/action'
import reducers from './reducer'

import { isEqual } from 'lodash'

import Storage from './lib/storage'
global.storage = new Storage()

const navReducer = (state, action) => {
    const nextState = AppNavigator.router.getStateForAction(action, state)
    return nextState || state
}

const rootReducer = combineReducers({
    ...reducers,
    navReducer
})

const store = configureStore(rootReducer)

if (module.hot) {
    module.hot.accept('./reducer.js', () => {
        const nextReducer = require('./reducer').default
        store.replaceReducer(nextReducer)
    })
}

@wrapper(store)
@connected(state => ({
    root: {
        ...state.messageCountReducer,
        ...state.authReducer,
        ...state.userPrefsReducer,
    },
    nav: state.navReducer
}), { fetchAuth, fetchMessageCount, fetchUserPrefs })
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
        fetchAuth()
        fetchUserPrefs()
        fetchMessageCount()
        SplashScreen.hide()
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.root.auth.isLogined && !this.props.root.auth.isLogined) {
            this.navigator && this.navigator.dispatch({ type: 'Navigate', routeName: 'home' })
        }
    }
    render() {
        return <AppNavigator ref={nav => { this.navigator = nav; }} navigation={addNavigationHelpers({
            dispatch:this.props.dispatch,
            state:this.props.nav
        })} screenProps={this.props.root}/>
    }
}

export default App