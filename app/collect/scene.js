'use strict'
import React from "react-native"
import {Scene} from "react-native-router-flux"
import UserCollect from "./collect"

export default [
    <Scene key="collect" component={UserCollect} hideNavBar={true}/>
]