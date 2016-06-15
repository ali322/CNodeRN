'use strict'
import React from "react-native"
import {Scene} from "../common/navigation/router"
import Message from "./message"
import Reply from "../topic/reply"

export default [
    <Scene key="message" component={Message}/>,
    <Scene key="reply2reply" component={Reply}/>
]