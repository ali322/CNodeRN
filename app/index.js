import React from 'react'
import { Platform } from 'react-native'
import { StackNavigator, addNavigationHelpers } from 'react-navigation'
import container from 'redux-container'
import { combineReducers } from 'redux'
import routes from './route'
import * as actions from './module/common/action'
import { fetchAuth } from './module/auth/action'
import { messageCountReducer, userPrefsReducer } from './module/common/reducer'
import { authReducer } from './module/auth/reducer'

import Storage from './lib/storage'
global.storage = new Storage()

const AppNavigator = StackNavigator(routes, {
    initialRouteName: 'home',
    headerMode: "none",
    mode: Platform.OS === 'ios' ? 'modal' : 'card'
})

const navReducer = (state, action) => {
    const nextState = AppNavigator.router.getStateForAction(action, state)
    return nextState || state
}

const rootReducer = combineReducers({
    messageCountReducer,
    authReducer,
    userPrefsReducer,
    navReducer
})

@container(rootReducer, {}, { ...actions, fetchAuth }, state => ({
    root: {
        ...state.messageCountReducer,
        ...state.authReducer,
        ...state.userPrefsReducer,
    },
    nav: state.navReducer
}))
class App extends React.Component {
    componentDidMount() {
        const { fetchAuth, fetchUserPrefs, fetchMessageCount } = this.props.actions
        fetchAuth()
        fetchUserPrefs()
        fetchMessageCount()
    }
    render() {
        const { userPrefs, auth } = this.props.root
        return <AppNavigator navigation={addNavigationHelpers({
            dispatch:this.props.dispatch,
            state:this.props.nav
        })} screenProps={{userPrefs,auth}}/>
    }
}

export default App