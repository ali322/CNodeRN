'use strict'

import {StyleSheet,Platform} from "react-native"
import listview from "../../common/stylesheet/listview"

const styles = {
    container:{
        flex:1,
        backgroundColor:"#FFF",
        marginBottom:49
    },
    navigationBarButton:{
        marginRight:8,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        width:50
    },
    navigationBarButtonText:{
        fontSize:16,
        color:"#666"
        // paddingLeft:3 
    },
    mineBreif:{
        height:150,
        backgroundColor:"#FFF",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
    mineAuthorize:{
        paddingHorizontal:8,
        paddingVertical:10,
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"
    },
    mineAuthorizeQrcode:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
    mineAuthorizeText:{
        fontSize:14,
        paddingVertical:4,
        color:"#333" 
    },
    mineAuthorizeSubtext:{
      fontSize:13,
      color:"#666"  
    },
    mineAvatar:{
      width:80,
      height:80,
      borderRadius:40  
    },
    mineTrends:{
        flex:1,
        position:"relative"
    },
    mineTrendsTab:{
        borderBottomColor:"#DDD",
        borderBottomWidth:0.5
    },
    mineTrendsUnselectedTab:{
        color:"#999"
    },
    mineTrendsSelectedTab:{
        color:"#333",
        fontWeight:"700"
    },
    mineTrendsContent:{
        flex:1
    },
    listCell:{
      ...listview.listCell,
      flexDirection:"column"  
    },
    topicImage:{
        width:35,
        height:35,
        borderRadius:5
    },
    topicBreif:{
        flex:1,
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"flex-start"
    },
    topicSubtitle:{
        paddingHorizontal:8,
        flex:1
    },
    topicSubtitleText:{
        fontSize:13,
        lineHeight:20
    },
    topicMintitleText:{
        fontSize:12,
        color:"#999",
        lineHeight:15
    },
    topicBadge:{
        width:50,
        paddingHorizontal:8,
        paddingVertical:4,
        backgroundColor:"#F8F8F8",
        borderRadius:3
    },
    topicBadgeText:{
        fontSize:12,
        color:"#666"
        // lineHeight:15
    },
    topicTitle:{
        // paddingHorizontal:8,
        paddingVertical:5
    },
    topicTitleText:{
      fontSize:15  
    }
}

const stylesForAndroid = {
    mineBreif:{
        ...styles.mineBreif
        // borderBottomColor:"#DDD",
        // borderBottomWidth:0.5
    }
}

const stylesForIOS = {
    mineBreif:{
        ...styles.mineBreif
        // borderBottomColor:"#DDD",
        // borderBottomWidth:0.5
    }
}

export default StyleSheet.create(Object.assign({},styles,
    Platform.OS === "ios"?stylesForIOS:{},
    Platform.OS === "android"?stylesForAndroid:{}
))