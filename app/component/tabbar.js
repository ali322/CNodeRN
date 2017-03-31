import { View, Text, StyleSheet, TouchableOpacity, Animated, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import preferredThemer from '../theme/'
import {connected} from 'redux-container'

const defaultStyles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: "row",
        height: 48,
        backgroundColor: "#F7F7F7",
        borderTopColor: "#DDD",
        borderTopWidth: 1
    },
    tabBarTab: {
        marginVertical: 4,
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-end'
    },
    tabBarIcon: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabBarLabel: {
        textAlign: 'center',
        fontSize: 10,
        marginBottom: 1.5,
        backgroundColor: 'transparent',
    }
})

const TabBarIcon = ({ scene, navigation, navigationState, position, renderIcon, activeTintColor, inactiveTintColor,styles }) => {
    const { route, index } = scene
    const { routes } = navigationState
    const inputRange = [-1, ...routes.map((x, i) => i)];
    const activeOpacity = position.interpolate({
        inputRange,
        outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
    });
    const inactiveOpacity = position.interpolate({
        inputRange,
        outputRange: inputRange.map((i) => (i === index ? 0 : 1)),
    })
    return (
        <View style={{flexGrow:1}}>
            <Animated.View style={[styles.tabBarIcon, { opacity: activeOpacity }]}>
            {renderIcon({
                route,
                index,
                focused: true,
                tintColor: activeTintColor,
            })}
            </Animated.View>
            <Animated.View style={[styles.tabBarIcon, { opacity: inactiveOpacity }]}>
            {renderIcon({
                route,
                index,
                focused: false,
                tintColor: inactiveTintColor,
            })}
            </Animated.View>
        </View>
    )
}

@connected(state=>({...state.userPrefsReducer}))
@preferredThemer(defaultStyles)
class TabBar extends React.PureComponent {
    static defaultProps = {
        activeTintColor: '#3478f6', // Default active tint color in iOS 10
        activeBackgroundColor: 'transparent',
        inactiveTintColor: '#929292', // Default inactive tint color in iOS 10
        inactiveBackgroundColor: 'transparent',
        showIcon: true,
        showLabel: true
    }
    render() {
        const {
            navigation,
            renderIcon,
            showIcon,
            showLabel,
            getLabel,
            labelStyle,
            activeBackgroundColor,
            inactiveBackgroundColor,
            jumpToIndex,
            position,
            navigationState,
            activeTintColor,
            inactiveTintColor,
            style
        } = this.props
        const { styles } = this.props
        const { routes } = navigation.state

        function _renderIcon(scene) {
            if (!showIcon) return null
            return <TabBarIcon position={position} navigation={navigation} navigationState={navigationState} styles={styles}
            activeTintColor={activeTintColor} inactiveTintColor={inactiveTintColor} renderIcon={renderIcon} scene={scene}/>
        }

        function _renderLabel(scene) {
            if (!showLabel) return null
            const { index } = scene;
            const { routes } = navigationState;
            const inputRange = [-1, ...routes.map((x, i) => i)];
            const outputRange = inputRange.map((inputIndex) =>
                (inputIndex === index ? activeTintColor : inactiveTintColor)
            );
            const color = position.interpolate({
                inputRange,
                outputRange,
            })
            const label = getLabel(scene);
            if (typeof label === 'string') {
                return (
                    <Animated.Text style={[styles.tabBarLabel, { color }, labelStyle]}>{label}</Animated.Text>
                );
            }
            if (typeof label === 'function') {
                return label(scene);
            }
            return label;
        }

        const inputRange = [-1, ...routes.map((x, i) => i)];
        return (
            <View style={[styles.tabBarContainer,style]}>
                {routes.map((route,index)=>{
                    const outputRange = inputRange.map((inputIndex) =>
                        (inputIndex === index ? activeBackgroundColor : inactiveBackgroundColor)
                    );
                    const backgroundColor = position.interpolate({
                        inputRange,
                        outputRange,
                    });
                    const justifyContent = this.props.showIcon ? 'flex-end' : 'center';
                    return (
                        <TouchableWithoutFeedback onPress={()=>jumpToIndex(index)} key={route.routeName}>
                            <Animated.View style={[styles.tabBarTab, { backgroundColor,justifyContent }]}>
                            {_renderIcon({route,index})}
                            {_renderLabel({route,index})}
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    )
                })}
            </View>
        )

    }
}

export default TabBar