'use strict'

import React,{Component} from "react"
import {PropTypes,View,StyleSheet} from "react-native"
import {combineReducers,bindActionCreators} from "redux"
import containerByComponent from "./lib/redux-helper"
import Router,{Scene} from "./common/navigation/router"
import routerReducer from "./common/navigation/reducer"
import Alert from "./common/component/alert"
import Splash from "./common/module/splash"
import MessageCounter from "./common/module/messagecounter"

import {fetchUserPrefs,saveUserPrefs,fetchAuthentication,saveAuthentication} from "./common/action"
import {userPrefsReducer,authenticationReducer} from "./common/reducer"
import Storage from "./lib/storage"
global.storage = new Storage()
global.cache = new Storage()

import topicScenes from "./topic/scene"
import collectScenes from "./collect/scene"
import messageScenes from "./message/scene"
import mineScenes from "./mine/scene"
import Login from "./authorize/login"
import Qrcode from "./authorize/qrcode"
import Immutable from "seamless-immutable"

class App extends Component{
    constructor(props){
        super(props)
        this._handleTabSelect = this._handleTabSelect.bind(this)
    }
    _handleTabSelect(navState,navActions){
        if(!this.props.authentication){
            this._alert.alert("请先登录","登录",[
                {text:"取消",style:"cancel"},
                {text:"确定",onPress:()=>navActions.pushScene("login")}
            ])
            return false
        }else{
            return true
        }
    }
    componentDidMount(){
        this.props.actions.fetchAuthentication()
        this.props.actions.fetchUserPrefs()
    }
    render(){
        const sceneProps = {userPrefs:this.props.userPrefs,
            saveUserPrefs:this.props.actions.saveUserPrefs,
            authentication:this.props.authentication,
            saveAuthentication:this.props.actions.saveAuthentication
        }
        if(this.props.userPrefsFetching || this.props.userFetching){
            return <Splash />
        }
        return (
            <View style={{flex:1}}>
                <Router initialSceneKey="tabs" sceneProps={sceneProps} 
                navigationState={this.props.navigationState} dispatch={this.props.dispatch}>
                    <Scene tabbar={true} key="tabs">
                        <Scene key="tab_1" title="主题" iconName="coffee">{topicScenes}</Scene>
                        <Scene key="tab_2" title="收藏" iconName="bookmark" onSelect={this._handleTabSelect}>{collectScenes}</Scene>
                        <Scene key="tab_3" title="消息" iconName="envelope" iconTag={MessageCounter} onSelect={this._handleTabSelect}>{messageScenes}</Scene>
                        <Scene key="tab_4" title="我的" iconName="user"  onSelect={this._handleTabSelect}>{mineScenes}</Scene>
                    </Scene>
                    <Scene key="login" component={Login}/>
                    <Scene key="qrcode" component={Qrcode}/>
                </Router>
                <Alert ref={view=>this._alert=view}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabBarItem: {
        flexDirection: "column",
        alignItems: "center"
    },
    tabBarItemText: {
        fontSize: 12,
        color: "#666",
        paddingTop:3
    }
})

const rootReducer = combineReducers({
    authenticationReducer,
    userPrefsReducer,
    navigationState:routerReducer
})

export default containerByComponent(App,rootReducer,dispatch=>({
    dispatch,
    actions:bindActionCreators({fetchUserPrefs,saveUserPrefs,fetchAuthentication,saveAuthentication},dispatch)
}),null,state=>({
    ...state.authenticationReducer,
    ...state.userPrefsReducer,
    navigationState:state.navigationState
}))