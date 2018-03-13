import React from 'react'
import { NavigationActions } from 'react-navigation'
import { View, Text, StyleSheet } from 'react-native'
import { Toast, Scanner } from '../../../component/'
import { connected } from 'redux-container'
import { login, saveAuth } from '../action'
import { navUtil } from '../../common/hoc'
import { Header } from '../../../component/'

@navUtil()
@connected(state => ({ ...state.authReducer }), { login, saveAuth })
class QrCode extends React.Component {
  constructor(props) {
    super(props)
    this.handleBarCodeRead = this.handleBarCodeRead.bind(this)
    this.successed = false
  }
  handleBarCodeRead(ret) {
    if (this.successed) {
      return
    }
    this.successed = true
    this.props.actions.login(ret.data)
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLogining && this.props.isLogining) {
      if (nextProps.isLogined) {
        this.toast.show('登陆成功!')
        this.props.actions.saveAuth(nextProps.auth)
        this.props.navigation.reset()
      } else {
        this.toast.show('登陆失败!')
      }
    }
  }
  render() {
    const { goBack } = this.props.navigation
    return (
      <View style={styles.container}>
        <Header leftButton="返回" onLeftButtonClick={() => goBack(null)} />
        <Scanner onBarCodeRead={this.handleBarCodeRead.bind(this)} />
        <Toast ref={view => (this.toast = view)} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default QrCode
