import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import Anonymous from '../../common/screen/anonymous'
import { connected } from 'redux-container'
import preferredThemer from '../../../theme/'
import defaultStyles from '../stylesheet'
import { Header } from '../../../component/'
import {navUtil} from '../../common/hoc'

@navUtil()
@preferredThemer(defaultStyles)
class Login extends React.Component {
    render() {
        const { navigate,reset,goBack } = this.props.navigation
        const { styles } = this.props
        return (
            <View style={styles.container}>
                <Header leftButton="" rightButton="关闭" onRightButtonClick={()=>reset(['home'])}/>
                <Anonymous toLogin={()=>navigate('qrcode')}/>
            </View>
        )
    }
}

export default Login