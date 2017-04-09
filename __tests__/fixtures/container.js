import React, { PropTypes, Children } from 'react'
import { wrapper,configureStore } from 'redux-container'
import reducers from '../../app/reducer'
import {combineReducers} from 'redux'

export default (initialState) => {
    const rootReducer = combineReducers(reducers)
    const store = configureStore(rootReducer)
    
    return Component => {
        return wrapper(store)(class extends React.Component {
            static childContextTypes = {
                userPrefs: PropTypes.object.isRequired,
                auth: PropTypes.object.isRequired
            }
            getChildContext() {
                return { auth: { isLogined: false }, userPrefs: { preferredTheme: 'default' } }
            }
            render() {
                return <Component {...this.props} actions={null}/>
            }
        })
    }
}