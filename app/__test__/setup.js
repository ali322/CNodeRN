'use strict'

var fs = require("fs"),
    path = require("path"),
    register = require("babel-core/register"),
    chai = require("chai"),
    chaiEnzyme = require("chai-enzyme");

var moduleForCompile = [
    "react-native",
    "react-native-vector-icons",
    "react-native-barcodescanner",
    "react-native-camera",
    "react-native-htmlview",
    "react-native-navbar",
    "react-native-progress",
    // "react-native-code-push",
    "react-native-scrollable-tab-view",
    "react-native-spinkit",
    "react-native-tab-navigator"
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
global.expect = chai.expect
chai.use(chaiEnzyme())

require('react-native-mock/mock')