'use strict'

import React,{Component,NavigationExperimental,PropTypes,View,Text,TouchableOpacity} from "react-native"
import {combineReducers,bindActionCreators} from "redux"
import {connect} from "react-redux"
import containerByComponent,{configureStore,createContainer} from "./lib/redux-helper"

const {
    RootContainer:NavigationRootContainer,
    AnimatedView:NavigationAnimatedView,
    Card:NavigationCard,
    StateUtils:NavigationStateUtils,
    Reducer:NavigationReducer
} = NavigationExperimental

const initialState = {
    key:"navigation",
    index:0,
    children:[
        {key:"first",title:"First"}
    ]
}

const NAV_PUSH = "NAV_PUSH"
const NAV_POP = "NAV_POP"

function navPush(state){
    state = typeof state === "string"?{key:state,title:state}:state
    return {
        type:NAV_PUSH,
        state
    }
}

function navPop(){
    return {
        type:NAV_POP
    }
}

const navigationReducer = (state=initialState,action)=>{
    let nextState = null
    switch (action.type) {
        case NAV_PUSH:
            if(state.children[state.index].key === (action.state && action.state.key)){
                return state
            }
            nextState = NavigationStateUtils.push(state,action.state)
            // console.log("nextState",nextState)
            return nextState
        case NAV_POP:
            if(state.index === 0 || state.children.length === 1){
                return state
            }
            return NavigationStateUtils.pop()
        default:
            return state
    }
}

// const basicReducer = NavigationReducer.StackReducer({
//     getPushedReducerForAction:(action)=>{
//         if(action.type === "push"){
//             return state=>state || {key:action.key}
//         }
//         return null
//     },
//     getReducerForState:(prevState)=>{
//         return (state) => state || prevState
//     },
//     initialState
// })

const appReducer = combineReducers({
    navigationState:navigationReducer
})

class AppNavigation extends Component{
    _renderScene(NavigationSceneRendererProps){
        return <NavigationCard {...NavigationSceneRendererProps} renderScene={({scene})=>{
            const {navigationState} = scene
            switch(navigationState.key){
                case "second":
                    return <Second key="second" {...this.props}/>
                case "first":
                    return <First key="first" {...this.props}/>
                
            }
        }} key={NavigationSceneRendererProps.scene.navigationState.key}/>
    }
    _handleAction(action){
        // console.log("action",action)
        return true
    }
    render(){
        // console.log("this.props",this.props)
        const { navigationState, onNavigate } = this.props
        return (
            <NavigationAnimatedView navigationState={navigationState} onNavigate={onNavigate} renderScene={this._renderScene.bind(this)}/>
        )
    }
}

class First extends Component{
    render(){
        return <View>
        <Text>First</Text>
        <TouchableOpacity onPress={()=>this.props.actions.navPush("second")}>
            <Text>next</Text>
        </TouchableOpacity>
        </View>
    }
}

class Second extends Component{
    render(){
        console.log("this.props",this.props)
        return <View><Text>Second</Text><TouchableOpacity><Text>back</Text></TouchableOpacity></View>
    }
}


export default containerByComponent(AppNavigation,appReducer,{navPush,navPop},null,
state=>({navigationState:state.navigationState}),
dispatch=>({
    onNavigate:(action)=>{
        dispatch(navPush(action))
    },
    actions:bindActionCreators({navPush,navPop},dispatch)
}))