'use strict'
import React from "react"
import {Scene} from "../common/navigation/router"
import Message from "./message"
import Reply from "../topic/reply"

export default [
    <Scene key="message" name="message" component={Message}/>
]