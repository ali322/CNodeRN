'use strict'
import React from "react"
import {Scene} from "../common/navigation/router"
import UserCollect from "./collect"
import Topic from "../topic/topic"
import Reply from "../topic/reply"

export default [
    <Scene key="collect" component={UserCollect}/>,
    <Scene key="collect2topic" component={Topic}/>,
    <Scene key="collect2reply" component={Reply}/>
]