'use strict'

import React from "react-native"
import {Actions,Scene} from "react-native-router-flux"
import Mine from "./mine"
import CameraRoll from "../common/camera"

export default [
    <Scene key="mine" component={Mine} hideNavBar={true}></Scene>,
    <Scene key="camera" component={CameraRoll} hideNavBar={true} hideTabBar={true}></Scene>
]