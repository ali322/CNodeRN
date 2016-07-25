'use strict'
import React from "react"
import {Scene} from "../common/navigation/router"
import Topics from "./topics"
import Topic from "./topic"
import Reply from "./reply"
import Publish from "./publish"

export default [
    <Scene key="topics" name="topics" component={Topics}/>,
    <Scene key="topic" name="topic"  hideTabBar={true} component={Topic}/>,
    <Scene key="publish" name="publish" hideTabBar={true} component={Publish}/>,
    <Scene key="reply" name="reply" hideTabBar={true} component={Reply}/>
]