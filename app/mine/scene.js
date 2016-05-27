'use strict'

import React,{Navigator} from "react-native"
import Mine from "./mine"
import Setup from "./setup"
import Updater from "./updater"

export default [
    {key:"mine",component:Mine},
    {key:"setup",component:Setup},
    {key:"updater",component:Updater,sceneConfig:Navigator.SceneConfigs.FloatFromBottom}
]