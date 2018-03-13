import React from 'react'
import { View, Text, StyleSheet, NetInfo } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import preferredThemer from '../../../theme/'

const defaultStyles = StyleSheet.create({
  offlineWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  offLineInfo: {
    paddingVertical: 8
  },
  offLineInfoText: {
    color: '#333'
  }
})

@preferredThemer(defaultStyles)
class BadRequest extends React.Component {
  static defaultProps = {
    reason: '请求失败'
  }
  render() {
    const { styles, styleConstants, reason } = this.props
    return (
      <View style={styles.offlineWrapper}>
        <Icon name="warning" color={styleConstants.loadingColor} size={20} />
        <View style={styles.offLineInfo}>
          <Text style={styles.offLineInfoText}>{reason}</Text>
        </View>
      </View>
    )
  }
}

export default BadRequest
