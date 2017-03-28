import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import Anonymous from '../../common/screen/anonymous'
import preferredThemer from '../../../theme/'
import defaultStyles from '../stylesheet'
import { Header } from '../../../component/'

@preferredThemer(defaultStyles)
class Login extends React.Component {
    static contextTypes = {
        userPrefs: PropTypes.object.isRequired
    }
    render() {
        const { navigate, goBack } = this.props.navigation
        const { styles } = this.props
        return (
            <View style={styles.container}>
                <Header leftButton="" rightButton="关闭" onRightButtonClick={()=>goBack(null)} userPrefs={userPrefs}/>
                <Anonymous toLogin={()=>navigate('qrcode')} userPrefs={userPrefs}/>
            </View>
        )
    }
}

export default Login