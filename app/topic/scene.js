'use strict'
import React from "react-native"
import {Actions,Scene} from "react-native-router-flux"
import Topics from "./topics"

export default [
    <Scene component={Topics} key="topics" hideNavBar={true} hideTabBar={false}/>
]