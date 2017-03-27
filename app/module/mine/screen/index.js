import { StackNavigator } from 'react-navigation'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import Mine from '../'
import Setup from './setup'
import Font from './font'
import Update from './update'

export default StackNavigator({
    mine: {
        screen: Mine,
        navigationOptions: {
            tabBar: ({ state }) => ({
                label: "我的",
                icon: ({ focused, tintColor }) => <Icon size={20} color={tintColor} name="user" />
            })
        }
    },
    setup: {
        screen: Setup,
        navigationOptions: {
            tabBar: ({ state }) => ({ visible: false })
        }
    },
    font: {
        screen: Font,
        navigationOptions: {
            tabBar: ({ state }) => ({ visible: false })
        }
    },
    update: {
        screen: Update,
        navigationOptions: {
            tabBar: ({ state }) => ({ visible: false })
        }
    }
}, { initialRouteName: 'mine', headerMode: "none" })