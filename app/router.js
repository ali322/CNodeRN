'use strict'

import React,{Component} from "react-native"
import _ from "lodash"

class Router{
    constructor(scenes){
        this.scenes = _.chain(scenes).groupBy("key").mapValues(v=>v[0]).value()
    }
    bindNavigator(navigator){
        const actions = _.chain(this.scenes)
            .mapValues(scene=>{
                return passProps=>{
                    navigator.push({
                        component:scene.component,
                        sceneConfig:scene.sceneConfig,
                        passProps
                    })
                }
            }).extend({goBack:navigator.pop}).value()
        return {...actions,scenes:this.scenes}
    }
    initialRoute(){
        const initialRouteKey = _.findKey(this.scenes,(scene)=>scene.initial === true)
        return this.scenes[initialRouteKey]
    }
}

export default Router
