import React from 'react'
import { View, Text } from 'react-native'
import Anonymous from '../../common/screen/anonymous'
import {mapProps} from '../../../lib/hoc'
import preferredThemer from '../../../theme/'
import defaultStyles from '../stylesheet'
import {Header} from '../../../component/'

@mapProps('screenProps')
@preferredThemer(defaultStyles)
class Login extends React.Component {
    render() {
        const {navigate,goBack} = this.props.navigation
        const {styles,userPrefs} = this.props
        return (
            <View style={styles.container}>
                <Header leftButton="" rightButton="关闭" onRightButtonClick={()=>goBack(null)} userPrefs={userPrefs}/>
                <Anonymous toLogin={()=>navigate('qrcode')} userPrefs={userPrefs}/>
            </View>
        )
    }
}

export default Login