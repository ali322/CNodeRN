'use strict'

import React from "react"
import {Scene} from "../common/navigation/router"
import Mine from "./mine"
import Setup from "./setup"
import Updater from "./updater"
import FontSwitcher from "./font"

export default [
    <Scene key="mine" name="mine" component={Mine}/>,
    <Scene key="setup" name="setup" component={Setup}/>,
    <Scene key="updater" name="updater" component={Updater}/>,
    <Scene key="font" name="font" component={FontSwitcher}/>
]