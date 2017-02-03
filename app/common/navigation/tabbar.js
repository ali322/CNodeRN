'use strict'

import React,{Component,PropTypes} from "react"
import {View,TouchableOpacity,StyleSheet,Text,Dimensions} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"

const styles = StyleSheet.create({
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
    _renderIcon(childProps,selected){
        const {styleConstants,userPrefs,authentication} = this.props
        const iconColor = "#333"
        const {title,iconName,iconTag} = childProps
        const selectedIconColor ="blue"
        return (
            <View style={styles.tabBarItem}>
                <Icon name={iconName} size={20} color={selected?selectedIconColor:iconColor}/>
                <Text style={[styles.tabBarItemText,
                selected?styles.tabBarSelectedItemText:null]}>{title}</Text>
                {iconTag?React.createElement(iconTag,{
                    userPrefs,authentication
                }):null}
            </View>
        )
    }
    _renderTabBar(){
        return React.Children.map(this.props.children,(child,i)=>{
            return (
                <TouchableOpacity style={styles.tab} key={i} onPress={()=>{
                    if(child.props.beforeSelect()){
                        this._handleClick(i)
                        child.props.afterSelect(i)
                    }
                }}>
                    {this._renderIcon(child.props,i === this.state.activeIndex)}
                </TouchableOpacity>
            )
        })
    }
    render(){
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