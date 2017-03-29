import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import Anonymous from '../../common/screen/anonymous'
import preferredThemer from '../../../theme/'
import defaultStyles from '../stylesheet'
import { Header } from '../../../component/'

@preferredThemer(defaultStyles)
class Login extends React.Component {
    render() {
        const { navigate, goBack } = this.props.navigation
        const { styles } = this.props
        return (
            <View style={styles.container}>
                <Header leftButton="" rightButton="关闭" onRightButtonClick={()=>goBack(null)}/>
                <Anonymous toLogin={()=>navigate('qrcode')}/>
            </View>
        )
    }
}

export default Login