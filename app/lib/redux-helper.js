'use strict'

import React,{Component} from "react-native"
import {connect,Provider} from "react-redux"
import {createStore,bindActionCreators,compose,applyMiddleware} from "redux"
import thunkMiddleware from "redux-thunk"

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
export function containerByComponent(OriginalComponent,rootReducer,actions,
    selector=(state)=>state,initialState={}){
    let bindedComponent = bindActionsToComponent(OriginalComponent,actions)
    let ConnectedComponent = connect(selector)(bindedComponent)
    
    class ComponentContainer extends Component{
        constructor(props){
            super(props);
            this.store = createStoreWithMiddleware(rootReducer,initialState)
        }
        render(){
            return (
                <Provider store={this.store}>
                    <ConnectedComponent {...this.props}/>
                </Provider>
            )
        }
    }
    return ComponentContainer
}