import { StyleSheet,Platform } from 'react-native'

const styles = {
    container: {
        flex: 1
    },
    updaterContainer: {
        backgroundColor: "#FFF",
        marginVertical: 10,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    updaterBreif: {
        paddingVertical: 10
    },
    updaterBreifText: {
        color: "#666"
    },
    updaterButtons: {
        paddingVertical: 8
    },
    updaterButton: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderColor: "#666",
        borderWidth: 0.5
    },
    updaterButtonText: {
        color: "#999",
        fontSize: 14
    }
}

const stylesForIOS = {}
const stylesForAndroid = {}

export default StyleSheet.create(Object.assign({},styles,
    Platform.OS === "ios"?stylesForIOS:null,
    Platform.OS === "android"?stylesForAndroid:null
))