import React,{Component,PropTypes} from "react"
import {View,Animated,StyleSheet,Dimensions,Text} from "react-native"

class Toast extends Component{
    static defaultProps = {
        duration:300
    }
    static propTypes = {
        duration:PropTypes.number
    }
    constructor(props){
        super(props)
        this.state = {
            active:false,
            text:"",
            fadeValue:new Animated.Value(0.4)
        }
    }
    componentWillUnmount(){
        clearTimeout(this.timeout)
    }
    show(text="",callback=()=>{},timeout=2000){
        const {duration} = this.props
        Animated.timing(this.state.fadeValue,{
            toValue:1,
            duration
        }).start()
        this.setState({
            active:true,
            text
        })
        this.timeout = setTimeout(()=>{
            Animated.timing(this.state.fadeValue,{
                toValue:0,
                duration
            }).start(()=>{
                this.setState({
                    active:false
                })
                callback()
            })
        },timeout - duration)
    }
    
    render(){
        if(!this.state.active){
            return null
        }
        return (
            <View style={styles.container}>
                <Animated.View style={[styles.toast,{
                    opacity:this.state.fadeValue
                }]}>
                    <Text style={styles.toastText}>{this.state.text}</Text>
                </Animated.View>
            </View>
        )
    }
}

const stylesForAll = {
    container:{
        position:"absolute",
        width:Dimensions.get("window").width,
        height:Dimensions.get("window").height,
        top:0,
        left:0,
        // flex:1,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    toast:{
        padding:10,
        backgroundColor:"rgba(0,0,0,0.8)",
        borderRadius:5
    },
    toastText:{
        fontSize:14,
        color:"white"
    }
}

const styles = StyleSheet.create(Object.assign({},stylesForAll))

export default Toast