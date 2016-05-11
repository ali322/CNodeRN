'use strict'

import React,{Component,AsyncStorage} from "react-native"
import {connect,Provider} from "react-redux"
import {createStore,bindActionCreators,compose,applyMiddleware} from "redux"
import {autoRehydrate,persistStore} from "redux-persist"
import thunkMiddleware from "redux-thunk"
import createLogger from "redux-logger"

const logger = createLogger()

const createStoreWithMiddleware = compose(
    applyMiddleware(thunkMiddleware)
    // typeof window === 'object' && 
    // typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
)(createStore)

 /**
 * return binded Component
 * 
 * @param UnbindComponent React.Component
 * @param actions Array<Function>
 * @returns bindedComponent React.Component
 */
function bindActionsToComponent(UnbindComponent,actions){
    return class extends Component{
        render(){
            return (
                <UnbindComponent {...this.props} 
                {...bindActionCreators(actions,this.props.dispatch)}/>
            )
        }
    }
}


/**
 * return container Component
 * 
 * @export
 * @param OriginalComponent React.Component
 * @param rootReducer Function
 * @param actions Array<Function>
 * @param selector Function
 * @param initialState Object
 * @returns (description)
 */
export function containerByComponent(OriginalComponent,rootReducer,actions,initialState=null,selector=(state)=>state,
onComplete=()=>{}){
    let bindedComponent = bindActionsToComponent(OriginalComponent,actions)
    let ConnectedComponent = connect(selector)(bindedComponent)
    
    const configureStore = autoRehydrate()(createStoreWithMiddleware)
    const store = initialState?configureStore(rootReducer,initialState):configureStore(rootReducer)
    persistStore(store,{storage:AsyncStorage},onComplete)
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