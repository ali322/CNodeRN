import { StackNavigator } from 'react-navigation'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import Mine from '../'
import Setup from './setup'
import Font from './font'
import Update from './update'

export default StackNavigator(
  {
    mine: {
      screen: Mine,
      navigationOptions: {
        tabBarLabel: '我的',
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon size={20} color={tintColor} name="user" />
        )
      }
    },
    setup: {
      screen: Setup,
      navigationOptions: {
        tabBarVisble: false
      }
    },
    font: {
      screen: Font,
      navigationOptions: {
        tabBarVisble: false
      }
    },
    update: {
      screen: Update,
      navigationOptions: {
        tabBarVisble: false
      }
    }
  },
  { initialRouteName: 'mine', headerMode: 'none' }
)
