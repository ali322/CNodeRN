import {StyleSheet, Platform} from "react-native"
import listview from "../../common/stylesheet/listview"
import navigationbar from "../../common/stylesheet/navigationbar"
import modal from "../../common/stylesheet/modal"

const styles = {
    ...listview,
    ...navigationbar,
    ...modal,
    navigationBarTitle:{
        ...navigationbar.navigationBarTitle,
        flexDirection:"row",
        alignItems:"center"
    },
    navigationBarTitleText:{
      ...navigationbar.navigationBarTitleText,
      marginRight:8  
    },
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
    },
    topicBadge:{
        marginRight:3
    //    backgroundColor:"red",
    },
    modalRow:{
        // lineHeight:20,
        paddingVertical:8
    },
    modalRowText:{
        fontSize:16
    },
    modalSelectedRowText:{
        color:"blue"
    }
}

const styleForAndroid = {}

const styleForIOS = {}

export default StyleSheet.create(Object.assign({}, styles,
    Platform.OS === "android" ? styleForAndroid : {},
    Platform.OS === "ios" ? styleForIOS : {}
))