'use strict'

var fs = require("fs"),
    path = require("path"),
    register = require("babel-register")

var moduleForCompile = [
    "react-native",
    "react-native-vector-icons",
    "react-native-barcodescanner",
    "react-native-camera",
    "react-native-progress",
    // "react-native-code-push",
    "react-native-scrollable-tab-view",
    "react-native-spinkit"
].map(moduleName=>new RegExp(`/node_modules/${moduleName}`))

const config = {
  "presets": [
    "react-native"
  ]
}

config.ignore = (filename)=>{
    if (!(/\/node_modules\//).test(filename)) {
        return false
    }else{
        const matches = moduleForCompile.filter((regexp)=>regexp.test(filename))
        return matches.length === 0
    }
}

register(config)

global.__DEV__ = true

if(process.env.NODE_ENV === "test"){
    require('react-native-mock/mock')
}