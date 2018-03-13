import { StackNavigator } from 'react-navigation'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import Topics from '../'
import Topic from './topic'
import Reply from './reply'

export default StackNavigator(
  {
    topics: {
      screen: Topics,
      navigationOptions: {
        tabBarLabel: '主题',
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon size={20} color={tintColor} name="coffee" />
        )
      }
    },
    topic: {
      screen: Topic,
      navigationOptions: {
        tabBarVisble: false
      }
    },
    reply: {
      screen: Reply,
      navigationOptions: {
        tabBarVisble: false
      }
    }
  },
  { initialRouteName: 'topics', headerMode: 'none' }
)
