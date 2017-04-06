import React, { Component } from "react"
import { StyleSheet, Dimensions, View, Text } from "react-native"
import Camera from "react-native-camera"

class Scanner extends Component {
    static defaultProps = {
        onBarCodeRead: () => {}
    }
    render() {
        return (
            <Camera style={styles.preview} aspect={Camera.constants.Aspect.fill}
                onBarCodeRead={this.props.onBarCodeRead}>
                    <View style={styles.topOverLayer}></View>
                    <View style={styles.scannerContainer}>
                        <View style={styles.horizontalOverLayer}></View>
                        <View style={styles.scanner}>
                            <View key={1} style={[styles.borderLeftTop, styles.borderBox]}></View>
                            <View key={2} style={[styles.borderRightTop, styles.borderBox]}></View>
                            <View key={3} style={[styles.borderLeftBottom, styles.borderBox]}></View>
                            <View key={4} style={[styles.borderRightBottom, styles.borderBox]}></View>
                        </View>
                        <View style={styles.horizontalOverLayer}></View>
                    </View>
                    <View style={styles.bottomOverLayer}>
                        <Text style={styles.scannerHint}>请将二维码放入框内</Text>
                    </View>
            </Camera>
        )
    }
}

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
const cameraHeight = screenHeight - 60
const borderColor = 'chartreuse'

const styles = StyleSheet.create({
    topOverLayer: {
        backgroundColor: "rgba(0,0,0,0.8)",
        width: screenWidth,
        height: (cameraHeight - 250) / 2
    },
    bottomOverLayer: {
        backgroundColor: "rgba(0,0,0,0.8)",
        width: screenWidth,
        height: (cameraHeight - 250) / 2,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    horizontalOverLayer: {
        backgroundColor: "rgba(0,0,0,0.8)",
        width: (screenWidth - 250) / 2,
        height: 250
    },
    preview: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: screenWidth
    },
    scannerContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    scanner: {
        width: 250,
        height: 250,
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:'rgba(255,255,255,0.6)',
        backgroundColor: "transparent"
    },
    scannerHint: {
        marginTop: 40,
        color: 'rgba(255,255,255,0.7)',
        fontSize: 18,
        backgroundColor: "transparent"
    },
    borderBox: {
        position: 'absolute',
        borderWidth: 2,
        height: 30,
        width: 30
    },
    borderLeftTop: {
        borderColor: 'transparent',
        borderLeftColor: borderColor,
        borderTopColor: borderColor,
        left: 0,
        top: 0
    },
    borderRightTop: {
        borderColor: 'transparent',
        borderRightColor: borderColor,
        borderTopColor: borderColor,
        right: 0,
        top: 0
    },
    borderLeftBottom: {
        borderColor: 'transparent',
        borderLeftColor: borderColor,
        borderBottomColor: borderColor,
        left: 0,
        bottom: 0
    },
    borderRightBottom: {
        borderColor: 'transparent',
        borderRightColor: borderColor,
        borderBottomColor: borderColor,
        right: 0,
        bottom: 0
    }
})

export default Scanner