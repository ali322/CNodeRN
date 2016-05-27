'use strict'

import React,{Component,View,Text,StyleSheet,TouchableOpacity} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"

class Anonymous extends Component{
    render(){
        return (
            <View style={styles.anonymousPanel}>
                <View style={styles.anonymousContainer}>
                    <Icon.Button name="qrcode" onPress={()=>Actions.qrcode()}
                    size={30} backgroundColor="transparent" color="#666">
                        <Text style={styles.authorizeQrcodeText}>扫码登录</Text>
                    </Icon.Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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

export default Anonymous