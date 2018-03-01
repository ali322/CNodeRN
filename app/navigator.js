import { TabNavigator, StackNavigator, NavigationActions } from 'react-navigation'
import React from 'react'
import { Platform } from 'react-native'
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
            tabBarLabel: '收藏',
            tabBarIcon: ({ focused, tintColor }) => <Icon size={20} color={tintColor} name="bookmark" />
        }
    },
    publish: {
        screen: Publish,
        tabBarOptions: {
            showLabel: false
        },
        navigationOptions: {
            tabBarLabel: () => null,
            tabBarIcon: ({ focused, tintColor }) => <Icon size={35} color='#3478f6' name="plus-square" />
        }
    },
    message: {
        screen: Message,
        navigationOptions: {
            tabBarLabel: '消息',
            tabBarIcon: ({ focused, tintColor }) => <Icon size={20} color={tintColor} name="envelope" />
        }
    },
    mine: { screen: Mine }
}, {
    tabBarComponent: TabBar,
    initialRouteName: 'topic',
    tabBarPosition: 'bottom',
    lazyLoad: true,
    tabBarOptions: {
        loginRequired: ['collect','publish','message','mine'],
        labelStyle: {
            fontSize: 12
        },
        style: {
            height: 50
        }
    }
})

const AppNavigator = StackNavigator({
    home: {
        screen: homeNavigator
    },
    login: {
        screen: Login
    },
    qrcode: {
        screen: Qrcode
    }
}, {
    initialRouteName: 'home',
    headerMode: "none",
    mode: Platform.OS === 'ios' ? 'modal' : 'card'
})

export default AppNavigator