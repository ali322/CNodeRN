'use strict'
import React from "react-native"
import Topics from "./topics"
import Topic from "./topic"
import Reply from "./reply"
import Publish from "./publish"

export default [
    {key:"topics",component:Topics,initial:true},
    {key:"topic",component:Topic},
    {key:"publish",component:Publish},
    {key:"reply",component:Reply}
]