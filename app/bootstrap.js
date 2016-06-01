'use strict'

import React,{Component,PropTypes,View} from "react-native"
import containerByComponent from "./lib/redux-helper"
import Router,{Scene} from "./common/navigation/router"
import Alert from "./common/component/alert"

import {fetchUserPrefs} from "./common/action"
import {userPrefsReducer} from "./common/reducer"
import Storage from "./lib/storage"
global.storage = new Storage()

import topicScenes from "./topic/scene"
import collectScenes from "./collect/scene"
import messageScenes from "./message/scene"
import mineScenes from "./mine/scene"
import Login from "./authorize/login"
import Qrcode from "./authorize/qrcode"
import Immutable from "seamless-immutable"
import _ from "lodash"

class App extends Component{
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
        }
    }
    componentDidMount(){
        this.props.actions.fetchUserPrefs()
        global.storage.getItem("user").then((user)=>{
            if(user){
                this.setState({isLogined:true})
            }
        })
    }
    render(){
        return (
            <View style={{flex:1}}>
                <Router initialSceneKey="tabs">
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

export default containerByComponent(App,userPrefsReducer,{fetchUserPrefs})