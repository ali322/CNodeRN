'use strict'
import React from "react"
import {Scene} from "../common/navigation/router"
import Topics from "./topics"
import Topic from "./topic"
import Reply from "./reply"
import Publish from "./publish"

export default [
    <Scene key="topics" component={Topics}/>,
    <Scene key="topic"  hideTabBar={true} component={Topic}/>,
    <Scene key="publish" hideTabBar={true} component={Publish}/>,
    <Scene key="reply" hideTabBar={true} component={Reply}/>
]