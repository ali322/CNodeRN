import React from "react"
import {View,Text,StyleSheet,NetInfo} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import preferredThemer from "../../../theme/"

const defaultStyles = StyleSheet.create({
    offlineWrapper:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#FFF"
    },
    offLineInfo:{
        paddingVertical:8
    },
    offLineInfoText:{
        color:"#333"
    }
})

@preferredThemer(defaultStyles)
class OffLine extends React.Component{
    render(){
        const {styles,styleConstants} = this.props
        return (
            <View style={styles.offlineWrapper}>
                <Icon name="warning" color={styleConstants.loadingColor} size={20}/>
                <View style={styles.offLineInfo}>
                    <Text style={styles.offLineInfoText}>网络无法连接..</Text>
                </View>
            </View>
        )
    }
}

export default Component=>class extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isConnected:null
        }
        this._handleNetInfoChange = this._handleNetInfoChange.bind(this)
    }
    componentDidMount() {
        NetInfo.isConnected.addEventListener("change",this._handleNetInfoChange)
        NetInfo.isConnected.fetch().done(isConnected=>{
            this.setState({isConnected})
        })
    }
    _handleNetInfoChange(isConnected){
        this.setState({
            isConnected
        })
    }
    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('change',this._handleNetInfoChange)
    }
    render(){
        if(this.state.isConnected === null){
            return null
        }
        return !this.state.isConnected?<OffLine {...this.props}/>:<Component {...this.props}/>
    }
}