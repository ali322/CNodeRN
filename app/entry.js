'use strict'

import React,{Component,View} from "react-native"
import {combineReducers} from "redux"
import containerByComponent from "./lib/redux-helper"
import Router,{Scene} from "./common/navigation/router"
import {fetchUserPrefs,saveUserPrefs} from "./common/action"
import {userPrefsReducer} from "./common/reducer"
import Alert from "./common/component/alert"

import topicScenes from "./topic/scene"
import collectScenes from "./collect/scene"
import messageScenes from "./message/scene"
import mineScenes from "./mine/scene"
import Login from "./authorize/login"
import Qrcode from "./authorize/qrcode"

class Entry extends Component{
    constructor(props){
        super(props)
        this.state = {
            isLogined:false
        }
        this._handleTabSelect = this._handleTabSelect.bind(this)
    }
    _handleTabSelect(navState,navActions){
        if(!this.state.isLogined){
            this._alert.alert("请先登录","登录",[
                {text:"取消",style:"cancel"},
                {text:"确定",onPress:()=>navActions.pushScene("login")}
            ])
        }else{
            return true
        }
    }
    componentDidMount(){
        this.props.actions.fetchUserPrefs()
    }
    render(){
        const sceneProps = {}
        return (
            <View style={{flex:1}}>
                <Router initialSceneKey="tabs" sceneProps={sceneProps} ref={view=>this._router=view}>
                    <Scene tabbar={true} key="tabs">
                        <Scene key="tab_1" title="主题" iconName="coffee">{topicScenes}</Scene>
                        <Scene key="tab_2" title="收藏" iconName="bookmark" onSelect={this._handleTabSelect}>{collectScenes}</Scene>
                        <Scene key="tab_3" title="消息" iconName="envelope" onSelect={this._handleTabSelect}>{messageScenes}</Scene>
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

export default containerByComponent(Entry,userPrefsReducer,{fetchUserPrefs,saveUserPrefs})