'use strict'

import React from "react"
import {Scene} from "../common/navigation/router"
import Mine from "./mine"
import Setup from "./setup"
import Updater from "./updater"

export default [
    <Scene key="mine" component={Mine}/>,
    <Scene key="setup" component={Setup}/>,
    <Scene key="updater" component={Updater}/>
]