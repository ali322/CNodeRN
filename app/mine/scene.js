'use strict'

import React from "react"
import {Scene} from "../common/navigation/router"
import Mine from "./mine"
import Setup from "./setup"
import Updater from "./updater"
import FontSwitcher from "./font"

export default [
    <Scene key="mine" component={Mine}/>,
    <Scene key="setup" component={Setup}/>,
    <Scene key="updater" component={Updater}/>,
    <Scene key="font" component={FontSwitcher}/>
]