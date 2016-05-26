'use strict'

import {createStore,applyMiddleware,compose} from "redux"
import thunkMiddleware from "redux-thunk"
import createLogger from "redux-logger"
import {autoRehydrate,persistStore} from "redux-persist"
import {AsyncStore} from "react-native"

const isDebugInChrome = __DEV__ && window.navigator.userAgent

let middlewares = [
    thunkMiddleware    
]

const logger = createLogger({
    // predicate: (getState, action) => isDebugInChrome,
    // collapsed: true,
    // duration: true
})

if(isDebugInChrome){
    middlewares.push(logger)
}

const createStoreWithMiddlewares = compose(
    applyMiddleware(...middlewares),
    typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
)(createStore)

export default function(rootReducer,initialState={},onComplete=()=>{}){
    const store = createStoreWithMiddlewares(rootReducer,initialState)
    // const store = autoRehydrate()(createStoreWithMiddlewares)(rootReducer,initialState)
    // persistStore(store,{storage:AsyncStore},onComplete)
    if(isDebugInChrome){
        window.store = store
    }
    return store
}

