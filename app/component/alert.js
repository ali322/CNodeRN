import React,{Component} from "react"
import {Modal,View,Text,TouchableOpacity,StyleSheet,Dimensions,Platform,Alert as NativeAlert} from "react-native"

class Alert extends Component{
    constructor(props){
        super(props)
        this.state = {
            active:false,
            text:"",
            message:"",
            buttons:[]
        }
    }
    alert(title="",message="",buttons){
        if(Platform.OS === "ios"){
            NativeAlert.alert(title,message,buttons)
        }else{
            this.setState({
                active:true,title,message,buttons
            })
        }
    }
    _renderButtons(){
        const {buttons} = this.state
        return (
            <View style={buttons.length <= 2?styles.alertHorizontalButtons:styles.alertVerticalButtons}>
                {buttons.map((btn,i)=>{
                    let handlePress = ()=>{
                        this.setState({active:false})
                        btn.onPress()
                    }
                    if(btn.style === "cancel"){
                        handlePress = ()=>this.setState({active:false})
                    }
                    return (
                        <TouchableOpacity onPress={handlePress} key={i} style={[styles.alertButton,
                            buttons.length === 2 && i === 0?{
                                borderRightWidth:0.5
                        }:null,buttons.length > 2 && i < (buttons.length - 1)?{
                            borderBottomWidth:0.5
                        }:null]}>
                        <Text style={styles.alertButtonText}>{btn.text}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }
    render(){
        const {active,title,message} = this.state
        if(!active){
            return null
        }
        return (
            <Modal animationType="none" visible={this.state.modalActive} transparent={true} 
            onRequestClose={()=>this.setState({active:false})}>
            <View style={styles.alertContainer}>
                <View style={styles.alertWrap}>
                    <View style={styles.alertTitle}>
                        <Text style={styles.alertTitleText}>{title}</Text>
                    </View>
                    {message?(
                    <View style={styles.alertMessage}>
                        <Text style={styles.alertMessageText}>{message}</Text>
                    </View>
                    ):null}
                    {this._renderButtons()}
                </View>
            </View>
            </Modal>
        )
    }
}

const stylesForAll = {
    alertContainer:{
        backgroundColor:"rgba(0,0,0,0.5)",
        flex:1,
        justifyContent:"center",
        padding:Dimensions.get("window").width * 0.2
    },
    alertWrap:{
        backgroundColor:"#FFF",
        borderRadius:5,
        paddingTop:8
    },
    alertTitle:{
      paddingVertical:8,
      flexDirection:"row",
      justifyContent:"center"  
    },
    alertTitleText:{
      fontSize:16  
    },
    alertMessage:{
        paddingTop:6,
        paddingBottom:10,
        flexDirection:"row",
        justifyContent:"center"  
    },
    alertMessageText:{
      fontSize:13,
      color:"#666"
    },
    alertHorizontalButtons:{
        borderTopWidth:0.5,
        borderColor:"#DDD",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    alertVerticalButtons:{
        borderTopWidth:0.5,
        borderColor:"#DDD",
        flexDirection:"column",
        justifyContent:"center"
        // alignItems:"center"   
    },
    alertButton:{
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        borderColor:"#DDD",
        paddingVertical:10
    },
    alertButtonText:{
        fontSize:16,
        color:"#3366FF"
    }
}

const styles = StyleSheet.create(Object.assign({},stylesForAll))

export default Alert