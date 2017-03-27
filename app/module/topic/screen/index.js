import { StackNavigator } from 'react-navigation'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import Topics from '../'
import Topic from './topic'
import Reply from './reply'

export default StackNavigator({
    topics: {
        screen: Topics,
        navigationOptions: {
            tabBar: ({ state }) => ({
                label: "主题",
                icon: ({ focused, tintColor }) => <Icon size={20} color={tintColor} name="coffee" />
            })
        }
    },
    topic: {
        screen: Topic,
        navigationOptions: {
            tabBar: ({ state }) => ({ visible: false })
        }
    },
    reply: {
        screen: Reply,
        navigationOptions: {
            tabBar: ({ state }) => ({ visible: false })
        }
    }
}, { initialRouteName: 'topics', headerMode: "none" })