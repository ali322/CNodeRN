import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native'
import preferredThemer from '../theme'
import { isEqual } from 'lodash'

const stylesForAll = {
  header: {
    height: Platform.OS === 'ios' ? 60 : 40,
    borderBottomColor: '#DDD',
    borderBottomWidth: 0.5,
    backgroundColor: '#FFF'
  },
  navigationBar: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  navigationBarButton: {
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50
  },
  navigationBarButtonText: {
    fontSize: 16,
    color: '#666'
    // paddingLeft:3
  },
  navigationBarTitle: {
    // height:20,
    // marginVertical:Platform.OS === "ios"?8:6,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  navigationBarTitleText: {
    fontSize: 16
  }
}

const defaultStyles = StyleSheet.create(stylesForAll)

@preferredThemer(defaultStyles)
class Header extends React.Component {
  static contextTypes = {
    userPrefs: PropTypes.object.isRequired
  }
  static defaultProps = {
    leftButton: '返回',
    onLeftButtonClick: () => {},
    onRightButtonClick: () => {}
  }
  constructor(props) {
    super(props)
    this.renderHeader = this.renderHeader.bind(this)
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (Platform.OS === 'ios') {
      if (
        nextContext.userPrefs &&
        !isEqual(nextContext.userPrefs, this.context.userPrefs)
      ) {
        StatusBar.setBarStyle(
          nextContext.userPrefs['preferredTheme'] === 'dark'
            ? 'light-content'
            : 'default'
        )
      }
      if (
        nextProps.userPrefs &&
        !isEqual(nextProps.userPrefs, this.props.userPrefs)
      ) {
        StatusBar.setBarStyle(
          nextProps.userPrefs['preferredTheme'] === 'dark'
            ? 'light-content'
            : 'default'
        )
      }
    }
  }
  componentDidMount() {
    if (Platform.OS === 'ios') {
      const userPrefs = this.props.userPrefs || this.context.userPrefs
      StatusBar.setBarStyle(
        userPrefs['preferredTheme'] === 'dark' ? 'light-content' : 'default'
      )
    }
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.raf)
  }
  renderHeader() {
    const { title, leftButton, rightButton, styles } = this.props
    const onLeftButtonClick = () => {
      this.raf = requestAnimationFrame(() => this.props.onLeftButtonClick())
    }
    const onRightButtonClick = () => {
      this.raf = requestAnimationFrame(() => this.props.onRightButtonClick())
    }
    let _title = (
      <View style={styles.navigationBarTitle}>
        {React.isValidElement(title) ? (
          title
        ) : (
          <Text style={styles.navigationBarTitleText}>{title}</Text>
        )}
      </View>
    )

    let _leftButton = (
      <TouchableOpacity
        style={[styles.navigationBarButton, { marginLeft: 5 }]}
        onPress={onLeftButtonClick}
      >
        {React.isValidElement(leftButton) ? (
          leftButton
        ) : (
          <Text style={styles.navigationBarButtonText}>{leftButton}</Text>
        )}
      </TouchableOpacity>
    )

    let _rightButton = (
      <TouchableOpacity
        style={[styles.navigationBarButton, { marginLeft: 5 }]}
        onPress={onRightButtonClick}
      >
        {React.isValidElement(rightButton) ? (
          rightButton
        ) : (
          <Text style={styles.navigationBarButtonText}>{rightButton}</Text>
        )}
      </TouchableOpacity>
    )

    return (
      <View style={styles.navigationBar} name="navigationBar">
        {_leftButton}
        {_title}
        {_rightButton}
      </View>
    )
  }
  render() {
    const { styles } = this.props
    return (
      <View style={styles.header}>
        {Platform.OS === 'ios' ? <StatusBar hidden={false} /> : null}
        {this.renderHeader()}
      </View>
    )
  }
}

export default Header
