'use strict'
import React from "react-native"
import {Actions,Scene} from "react-native-router-flux"
import Topics from "./topics"
import Topic from "./topic"
import Reply from "./reply"
import Publish from "./publish"

export default [
    <Scene component={Topics} key="topics" hideNavBar={true} hideTabBar={false}/>,
    <Scene component={Topic} key="topic" hideNavBar={true} hideTabBar={true}/>,
    <Scene component={Publish} key="publish" hideNavBar={true} hideTabBar={true}/>,
    <Scene component={Reply} key="reply" hideNavBar={true} hideTabBar={true}/>
]