import { TabNavigator, StackNavigator } from 'react-navigation'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import Topics from './module/topic/screen/'
import Mine from './module/mine/screen/'
import Collect from './module/collect/'
import Message from './module/message/'
import Login from './module/auth/screen/login'
import Qrcode from './module/auth/screen/qrcode'
import Publish from './module/topic/screen/publish'
import { TabBar } from './component/'


const homeNavigator = TabNavigator({
    topic: { screen: Topics },
    collect: {
        screen: Collect,
        navigationOptions: {
            tabBar: ({ state }) => ({
                label: "收藏",
                icon: ({ focused, tintColor }) => <Icon size={20} color={tintColor} name="bookmark" />
            })
        }
    },
    publish: {
        screen: Publish,
        navigationOptions: {
            tabBar: ({ state }) => ({
                label: () => null,
                icon: ({ focused, tintColor }) => <Icon size={32} color='#3478f6' name="plus-square" />
            })
        }
    },
    message: {
        screen: Message,
        navigationOptions: {
            tabBar: ({ state }) => ({
                label: "消息",
                icon: ({ focused, tintColor }) => <Icon size={20} color={tintColor} name="envelope" />
            })
        }
    },
    mine: { screen: Mine }
}, {
    tabBarComponent: TabBar,
    initialRouteName: 'topic',
    tabBarPosition: 'bottom',
    tabBarOptions: {
        labelStyle: {
            fontSize: 12
        },
        style: {
            height: 50,
            backgroundColor: "#F7F7F7"
        }
    }
})

const routes = {
    home: {
        screen: homeNavigator
    },
    login: {
        screen: Login
    },
    qrcode: {
        screen: Qrcode
    }
}

export default routes