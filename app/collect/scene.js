'use strict'
import React from "react"
import {Scene} from "../common/navigation/router"
import UserCollect from "./collect"
import Topic from "../topic/topic"
import Reply from "../topic/reply"

export default [
    <Scene key="collect" name="collect" component={UserCollect}/>
]