import React,{Component} from "react"
import {View,Text,StyleSheet,TouchableOpacity} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import preferredThemer from "../../../theme/"

const defaultStyles = StyleSheet.create({
    anonymousPanel:{
        flex:1,
        backgroundColor:"#FFF",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
    anonymousContainer:{
        paddingHorizontal:8,
        paddingVertical:10,
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"
    },
    authorizeQrcodeText:{
        color:"#666"
    }
})

@preferredThemer(defaultStyles)
class Anonymous extends Component{
    render(){
        const {styles} = this.props
        return (
            <View style={styles.anonymousPanel}>
                <View style={styles.anonymousContainer}>
                    <Icon.Button name="qrcode" onPress={this.props.toLogin}
                    size={30} backgroundColor="transparent" color="#666">
                        <Text style={styles.authorizeQrcodeText}>扫码登录</Text>
                    </Icon.Button>
                </View>
            </View>
        )
    }
}

export default Anonymous