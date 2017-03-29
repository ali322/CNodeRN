import React,{PropTypes} from 'react'
import { View,Text,TouchableOpacity } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome"
import { Header } from '../../../component/'
import defaultStyles from '../stylesheet/setup'
import preferredThemer from '../../../theme/'
import { connected } from 'redux-container'
import { saveUserPrefs } from '../../common/action'

@preferredThemer(defaultStyles)
@connected({saveUserPrefs})
class Font extends React.Component {
    static contextTypes = {
        userPrefs:PropTypes.object.isRequired
    }
    constructor(props) {
        super(props)
        this.handleChangeFont = this.handleChangeFont.bind(this)
    }
    handleChangeFont(size) {
        const { saveUserPrefs } = this.props.actions
        saveUserPrefs({
            ...this.context.userPrefs,
            preferredFontSize: size
        })
    }
    render() {
        const {userPrefs} = this.context
        const { styles } = this.props
        const { goBack } = this.props.navigation
        return (
            <View style={styles.container}>
                <Header title="字体大小" onLeftButtonClick={()=>goBack(null)}/>
                <View style={styles.setupPanel}>
                <TouchableOpacity style={[styles.setupRow,{borderBottomWidth:0.5}]} onPress={()=>this.handleChangeFont(14)}>
                    <View style={styles.setupRowLabel}>
                        <Text style={styles.setupRowLabelText}>小</Text>
                    </View>
                    <View style={styles.setupAccessory}>
                       <Text style={[styles.setupRowLabelText]}>{userPrefs["preferredFontSize"] === 14?<Icon name="check" size={16} color="limegreen"/>:null}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.setupRow,{borderBottomWidth:0.5}]} onPress={()=>this.handleChangeFont(16)}>
                    <View style={styles.setupRowLabel}>
                        <Text style={styles.setupRowLabelText}>中</Text>
                    </View>
                    <View style={styles.setupAccessory}>
                       <Text style={[styles.setupRowLabelText]}>{userPrefs["preferredFontSize"] === 16?<Icon name="check" size={16} color="limegreen"/>:null}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.setupRow,{borderBottomWidth:0.5}]} onPress={()=>this.handleChangeFont(18)}>
                    <View style={styles.setupRowLabel}>
                        <Text style={styles.setupRowLabelText}>大</Text>
                    </View>
                    <View style={styles.setupAccessory}>
                       <Text style={[styles.setupRowLabelText]}>{userPrefs["preferredFontSize"] === 18?<Icon name="check" size={16} color="limegreen"/>:null}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            </View>
        )
    }
}
export default Font