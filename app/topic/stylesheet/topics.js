import {StyleSheet, Platform} from "react-native"
import listview from "../../common/stylesheet/listview"
import navigationbar from "../../common/stylesheet/navigationbar"

const styles = {
    ...listview,
    ...navigationbar,
    container:{
        flex:1,
        backgroundColor:"#FFF",
        marginBottom:49
    },
    cellImage:{
        width:50,
        height:50,
        borderRadius:25
    },
    cellAccessory:{
        fontSize:12,
        color:"coral"
    }
}

const styleForAndroid = {}

const styleForIOS = {}

export default StyleSheet.create(Object.assign({}, styles,
    Platform.OS === "android" ? styleForAndroid : {},
    Platform.OS === "ios" ? styleForIOS : {}
))