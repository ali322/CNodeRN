'use strict'

import React,{Component,NavigationExperimental,PropTypes,View,Text,TouchableOpacity,StyleSheet} from "react-native"
import {combineReducers,bindActionCreators} from "redux"
import {connect} from "react-redux"
import containerByComponent,{configureStore,createContainer} from "./lib/redux-helper"
import Router,{Scene} from "./common/navigation/router"

import {fetchUserPrefs} from "./common/action"
import {userPrefsReducer} from "./common/reducer"
import tabBarCreator from "./common/module/tabbar-creator"
import Storage from "./lib/storage"
global.storage = new Storage()

import topicScenes from "./topic/scene"
import collectScenes from "./collect/scene"
import messageScenes from "./message/scene"
import mineScenes from "./mine/scene"

export default class App extends Component{
    render(){
        return (
            <Router>
                <Scene tabbar={true} key="tabs">
                    <Scene key="tab_1" title="主题" iconName="coffee">{topicScenes}</Scene>
                    <Scene key="tab_2" title="收藏" iconName="bookmark">{collectScenes}</Scene>
                    <Scene key="tab_3" title="消息" iconName="envelope">{messageScenes}</Scene>
                    <Scene key="tab_4" title="我的" iconName="user">{mineScenes}</Scene>
                </Scene>
            </Router>
        )
    }
}