'use strict'

var RCTLog = require('RCTLog')

import {AppRegistry} from 'react-native'
import App from "./app/bootstrap"

AppRegistry.registerComponent('CNodeRN', () => App)