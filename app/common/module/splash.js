'use strict'

import React,{Component,StyleSheet,View,Image} from "react-native"

class Splash extends Component{
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.splashPanel}>
                    <Image source={require("../../asset/cnode.png")} style={styles.splashImage}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#FFF"
    },
    splashImage:{
        width:260,
        height:89
    }
})

export default Splash