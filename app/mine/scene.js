'use strict'

import React from "react-native"
import {Actions,Scene} from "react-native-router-flux"
import Mine from "./mine"
import Setup from "./setup"
import Updater from "./updater"
import Push from "./push"

export default [
    <Scene key="mine" component={Mine} hideNavBar={true}></Scene>,
    <Scene key="setup" component={Setup} hideNavBar={true} hideTabBar={true}></Scene>,
    <Scene key="updater" component={Updater} hideNavBar={true} hideTabBar={true}></Scene>
]