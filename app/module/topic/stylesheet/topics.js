import { StyleSheet, Platform, Dimensions } from "react-native"
import listview from "../../common/stylesheet/listview"
import modal from "../../common/stylesheet/modal"

const screenWidth = Dimensions.get('window').width

const styles = {
    ...listview,
    ...modal,
    navigationBarButton: {
        marginRight: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: 50
    },
    navigationBarButtonText: {
        fontSize: 16,
        color: "#666"
        // paddingLeft:3 
    },
    navigationBarTitle: {
        flex: 1,
        marginVertical: Platform.OS === "ios" ? 8 : 6,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    navigationBarTitleText: {
        fontSize: 16,
        marginRight: 8
    },
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    topicCell: {
        flex: 1,
        padding: 10,
        backgroundColor: "transparent",
        flexDirection: "column"
    },
    topicImage: {
        width: 35,
        height: 35,
        borderRadius: 5
    },
    topicBreif: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    topicSubtitle: {
        paddingHorizontal: 8,
        flex: 1
    },
    topicSubtitleText: {
        fontSize: 13,
        lineHeight: 20
    },
    topicMintitle: {
        flexDirection: "row",
        alignItems: "center"
    },
    topicMintitleText: {
        fontSize: 12,
        color: "#999",
        lineHeight: 15
    },
    topicTag: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        backgroundColor: "#EFEFEF",
        borderRadius: 3,
        marginLeft: 8
    },
    topicTagText: {
        fontSize: 12,
        color: "#666"
        // lineHeight:15
    },
    topicAccessory: {
        // width:50
        paddingHorizontal: 5
    },
    topicStatic: {
        fontSize: 13,
        color: "#666"
    },
    topicReply: {
        //   marginRight:8,
        color: "#333",
        fontSize: 14,
        fontWeight: "700"
    },
    topicTitle: {
        // paddingHorizontal:8,
        paddingVertical: 5
    },
    topicTitleText: {
        fontSize: 15
    },
    tab: {
        borderBottomColor: "#DDD",
        borderBottomWidth: 0.5,
        height: 40
    },
    unselectedTab: {
        color: "#999"
    },
    selectedTab: {
        color: "#333",
        fontWeight: "700"
    },
    tabContainer: {
        width: screenWidth,
        flex:1,
    }
}

const styleForAndroid = {}

const styleForIOS = {
    container: {
        ...styles.container,
        paddingTop: 20
    }
}

export default StyleSheet.create(Object.assign({}, styles,
    Platform.OS === "android" ? styleForAndroid : {},
    Platform.OS === "ios" ? styleForIOS : {}
))