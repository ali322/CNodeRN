'use strict'

import React,{Component,Navigator,View,Platform} from "react-native"
import {Provider,connect} from "react-redux"
import configureStore from "./lib/configure-store"
import {fetchUserPrefs} from "./common/action"
import {userPrefsReducer} from "./common/reducer"

import Router from "./router"
import topicScenes from "./topic/scene"

import Storage from "./lib/storage"
global.storage = new Storage()

const router = new Router([...topicScenes])

class App extends Component{
    constructor(props){
        super(props)
    }
    _renderScene(route,navigator){
        const {key,component,passProps} = route
        const _router = router.bindNavigator(navigator)
        if(component){
            return React.createElement(component,{
                router:_router,
                ...passProps,
                app:{...this.props}
            })
        }
        return null
    }
    _configureScene(route){
        if(route.sceneConfig){
            return route.sceneConfig
        }
        return Platform.OS === "android"?Navigator.SceneConfigs.FloatFromBottomAndroid:Navigator.SceneConfigs.HorizontalSwipeJump
    }
    componentDidMount(){
        this.props.dispatch(fetchUserPrefs())
    }
    render(){
        const initialRoute = router.initialRoute()
        return (
           <Navigator initialRoute={initialRoute} renderScene={this._renderScene.bind(this)} ref={view=>this._navigator=view} 
           configureScene={this._configureScene}/>
        )
    }
}


const store = configureStore(userPrefsReducer)
const AppConnected = connect(state=>state)(App)

class BootStrap extends Component{
    render(){
        return (
            <Provider store={store}>
            <AppConnected />
            </Provider>
        )
    }
}

export default BootStrap