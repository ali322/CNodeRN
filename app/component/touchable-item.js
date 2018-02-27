import React, { Children } from 'react'
import PropTypes from 'prop-types'
import { View, Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native'

const ANDROID_VERSION_LOLLIPOP = 21;

class TouchableItem extends React.PureComponent {
    static propTypes = {
        // onPress: PropTypes.func,
        activeOpacity: PropTypes.number,
        children: PropTypes.node.isRequired,
        style: View.propTypes.style,
        pressColor: PropTypes.string,
        borderless: PropTypes.bool
    }
    static defaultProps = {
        pressColor: 'rgba(0,0,0,.32)'
    }
    render() {
        const { style, ...rest } = this.props
        if (Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_LOLLIPOP) {
            return (
                <TouchableNativeFeedback {...rest} style={null} background={
                    TouchableNativeFeedback.Ripple(this.props.pressColor,this.props.borderless)
                }>
                <View style={style}>{Children.only(this.props.children)}</View>
                </TouchableNativeFeedback>
            )
        }
        return (
            <TouchableOpacity {...this.props}>{this.props.children}</TouchableOpacity>
        )
    }
}

export default TouchableItem