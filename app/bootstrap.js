'use strict'

import React,{Component,Navigator,View,Platform} from "react-native"
import {Provider,connect} from "react-redux"
import configureStore from "./lib/configure-store"
import {fetchUserPrefs} from "./common/action"
import {userPrefsReducer} from "./common/reducer"
import tabBarCreator from "./common/tabbar-creator"
import Storage from "./lib/storage"
global.storage = new Storage()

import Router from "./router"
import topicScenes from "./topic/scene"
import collectScenes from "./collect/scene"
import messageScenes from "./message/scene"
import mineScenes from "./mine/scene"

const router = new Router([...topicScenes,...collectScenes,...messageScenes,...mineScenes])

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
        return Platform.OS === "android"?Navigator.SceneConfigs.FloatFromBottomAndroid:Navigator.SceneConfigs.PushFromRight
    }
    componentDidMount(){
        this.props.dispatch(fetchUserPrefs())
    }
    render(){
        const initialRoute = {
            key:"home",
            component:tabBarCreator(router,[
                {sceneName:"topics",title:"主题",iconName:"coffee"},
                {sceneName:"collect",title:"收藏",iconName:"bookmark"},
                {sceneName:"message",title:"消息",iconName:"envelope"},
                {sceneName:"mine",title:"我的",iconName:"user"}
            ])
        }
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