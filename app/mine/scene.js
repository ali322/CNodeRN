'use strict'

import React from "react-native"
import {Actions,Scene} from "react-native-router-flux"
import Mine from "./mine"
import QrCode from "./qrcode"
import Setup from "./setup"

export default [
    <Scene key="mine" component={Mine} hideNavBar={true}></Scene>,
    <Scene key="qrcode" component={QrCode} hideNavBar={true} hideTabBar={true}></Scene>,
    <Scene key="setup" component={Setup} hideNavBar={true} hideTabBar={true}></Scene>
]