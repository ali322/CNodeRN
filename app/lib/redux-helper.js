'use strict'
import React,{Component} from "react"
import {createStore,applyMiddleware,compose,bindActionCreators} from "redux"
import {connect,Provider} from "react-redux"
import thunkMiddleware from "redux-thunk"
import createLogger from "redux-logger"
import {autoRehydrate,persistStore} from "redux-persist"
import {AsyncStorage,Platform} from "react-native"
import devTools from 'remote-redux-devtools'
import _ from "lodash"

const isDebugInChrome = __DEV__ && typeof window !== "undefined" 
&& window.navigator.userAgent 
&& window.navigator.userAgent.toLowerCase().indexOf("chrome") > -1

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
    // devTools({
    //     name: Platform.OS,
    //     hostname: 'localhost',
    //     port: 5678
    // })
)(createStore)

export function configureStore(rootReducer,initialState,onComplete=()=>{}){
    // let store = initialState?createStoreWithMiddlewares(rootReducer,initialState):createStoreWithMiddlewares(rootReducer)
    const createStoreRehydrated = autoRehydrate()(createStoreWithMiddlewares)
    const store = initialState?createStoreRehydrated(rootReducer,initialState):createStoreRehydrated(rootReducer)
    persistStore(store,{storage:AsyncStorage},onComplete).purgeAll()
    if(isDebugInChrome){
        window.store = store
    }
    return store
}


export function createContainer(OriginComponent,store,actions,mapStateToProps=state=>state){
    const mapDispatchToProps = _.isFunction(actions)?actions:(dispatch)=>({
        actions:bindActionCreators(actions,dispatch)
    })
    const ConnectedComponent = connect(mapStateToProps,mapDispatchToProps)(OriginComponent)
    return class extends Component{
        render(){
            return (
                <Provider store={store}>
                <ConnectedComponent {...this.props}/>
                </Provider>
            )
        }
    }
}

export default function(OriginComponent,rootReducer,actions,initialState,mapStateToProps){
    const store = configureStore(rootReducer,initialState)
    return createContainer(OriginComponent,store,actions,mapStateToProps)    
}