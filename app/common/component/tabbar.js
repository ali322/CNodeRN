'use strict'

import React,{Component,PropTypes} from "react"
import {View,TouchableOpacity,StyleSheet,Text,Dimensions} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import preferredThemer from "../theme"

const defaultStyles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"column",
        justifyContent:"center"
    },
    tabContent:{
        flex:1  
    },
    tabs:{
        position:"absolute",
        bottom:0,
        left:0,
        width:Dimensions.get("window").width,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        height:50,
        backgroundColor: "#F7F7F7",
        borderTopWidth: 1,
        borderTopColor: "#DDD"
    },
    tab:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    tabBarItem: {
        flexDirection: "column",
        alignItems: "center"
    },
    tabBarItemText: {
        fontSize: 12,
        color: "#666",
        paddingTop:3
    },
    tabBarSelectedItemText:{
        color:"blue"
    }
})

@preferredThemer(defaultStyles)
class TabBar extends Component{
    static defaultProps = {
        activeIndex:0,
        visible:true
    }
    static propTypes = {
        activeIndex:PropTypes.number
        // beforeSelect:PropTypes.function
    }
    constructor(props){
        super(props)
        this.state = {
            activeIndex:props.activeIndex
        }
        this._handleClick = this._handleClick.bind(this)
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.activeIndex !== this.props.activeIndex){
            this.setState({activeIndex:nextProps.activeIndex})
        }
    }
    _handleClick(index){
        if(this.state.activeIndex !== index){
            this.setState({
                activeIndex:index
            })
        }
    }
    _renderTabContent(){
        return  React.Children.toArray(this.props.children)
            .filter((child,i)=>this.state.activeIndex === i)[0]
    }
    _renderIcon(tintText,iconName,selected){
        const {styles,styleConstants} = this.props
        const iconColor = styleConstants.tabBarItemColor
        const selectedIconColor = styleConstants.tabBarSelectedItemColor
        return (
            <View style={styles.tabBarItem}>
                <Icon name={iconName} size={20} color={selected?selectedIconColor:iconColor}/>
                <Text style={[styles.tabBarItemText,
                selected?styles.tabBarSelectedItemText:null]}>{tintText}</Text>
            </View>
        )
    }
    _renderTabBar(){
        const {styles} = this.props
        return React.Children.map(this.props.children,(child,i)=>{
            return (
                <TouchableOpacity style={styles.tab} key={i} onPress={()=>{
                    if(child.props.beforeSelect()){
                        this._handleClick(i)
                        child.props.afterSelect(i)
                    }
                }}>
                    {this._renderIcon(child.props.title,child.props.iconName,i === this.state.activeIndex)}
                </TouchableOpacity>
            )
        })
    }
    render(){
        const {styles} = this.props
        return (
            <View style={styles.container}>
            <View style={styles.tabContent}>
                {this._renderTabContent()}
            </View>
            {this.props.visible?(
                <View style={styles.tabs}>
                    {this._renderTabBar()}
                </View>
            ):null}
            </View>
        )
    }
}

class TabBarItem extends Component{
    static defaultProps = {
        beforeSelect:()=>true,
        afterSelect:()=>{}
    }
    render(){
        const child = React.Children.only(this.props.children)
        return React.cloneElement(child)
    }
}

TabBar.Item = TabBarItem

export default TabBar