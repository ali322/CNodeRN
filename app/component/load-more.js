import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Spinner from 'react-native-spinkit'

import preferredThemer from '../theme'

const defaultStyles = StyleSheet.create({
  loadMore: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadMoreTextWrapper: {
    paddingLeft: 5
  },
  loadMoreText: {
    fontSize: 13,
    color: '#AAA'
  },
  loadMoreIdentifier: {
    paddingLeft: 5
  }
})

@preferredThemer(defaultStyles)
class LoadMore extends Component {
  static propTypes = {
    active: PropTypes.bool
  }
  static defaultProps = {
    active: false
  }
  render() {
    const { styles, styleConstants } = this.props
    const loadMoreColor = styleConstants.loadMoreColor
    return (
      <View style={styles.loadMore}>
        {this.props.active ? (
          <Spinner
            isVisble={true}
            type="Circle"
            size={13}
            color={loadMoreColor}
          />
        ) : (
          <Icon name="arrow-upward" size={20} color={loadMoreColor} />
        )}
        <View style={styles.loadMoreTextWrapper}>
          <Text style={styles.loadMoreText}>
            {this.props.active ? '加载中...' : '上拉加载更多'}
          </Text>
        </View>
      </View>
    )
  }
}

export default LoadMore
