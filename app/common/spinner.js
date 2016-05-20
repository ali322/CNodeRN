'use strict'

import React,{Component,Animated,Easing,View,InteractionManager} from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

class Spinner extends Component{
    constructor(props){
        super(props)
        this.state = {
            rotateValue:new Animated.Value(0)
        }
    }
    startRotate(){
        this.state.rotateValue.setValue(0)
        Animated.timing(this.state.rotateValue,{
            toValue:1,
            duration:800,
            easing:Easing.linear
        }).start(()=>this.startRotate())
    }
    componentDidMount(){
        const handler = InteractionManager.createInteractionHandle()
        this.startRotate()
        InteractionManager.clearInteractionHandle(handler)
    }
    componentWillUnmount(){
        this.state.rotateValue.stopAnimation()
    }
    render(){
        // const AnimatedComponent = Animated.createAnimatedComponent(Icon)
        return (
            <Animated.View 
            style={{transform:[{
                rotateZ:this.state.rotateValue.interpolate({
                    inputRange:[0,1],
                    outputRange:["0deg","360deg"]
                })
            }]}}>
            <Icon name={this.props.name} color={this.props.color}
            size={this.props.size}/>
            </Animated.View>
        )
    }
}

Spinner.defaultProps = {
    size:20,
    name:"load-c",
    color:"#333",
    style:{}
}

export default Spinner