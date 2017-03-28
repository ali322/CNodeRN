import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Toast, Scanner } from '../../../component/'
import { connected } from 'redux-container'
import { login, saveAuth } from '../action'
import { Header } from '../../../component/'

@connected({ login, saveAuth })
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
    componentDidMount() {
        this.props.actions.saveAuth({ username: 'ali322', accessToken: ' 01206bae-f6ed-42de-bd0e-3775776deaf9' })
    }
    componentWillReceiveProps(nextProps) {
        if (!nextProps.isLogining && this.props.isLogining) {
            if (nextProps.isLogined) {
                this.toast.show('登陆成功!')
                this.props.actions.saveAuth(nextProps.user)
            } else {
                this.toast.show('登陆失败!')
            }
        }
    }
    render() {
        const { goBack } = this.props.navigation
        return (
            <View style={styles.container}>
                <Header leftButton="返回" onLeftButtonClick={()=>goBack(null)}/>
                <Scanner onBarCodeRead={this.handleBarCodeRead.bind(this)}/>
                <Toast ref={(view)=>this.toast=view}/>
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