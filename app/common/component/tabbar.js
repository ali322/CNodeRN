'use strict'

import React,{Component,View,TouchableOpacity,StyleSheet,Text,Dimensions,PropTypes} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"

class TabBar extends Component{
    static defaultProps = {
        activeIndex:0
    }
    static propTypes = {
        activeIndex:PropTypes.number,
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
    _renderTabBar(){
        return React.Children.map(this.props.children,(child,i)=>{
            return (
                <TouchableOpacity style={styles.tab} key={i} onPress={()=>{
                    if(child.props.beforeSelect()){
                        this._handleClick(i)
                        child.props.afterSelect(i)
                    }
                }}>
                    {child.props.renderIcon(i === this.state.activeIndex)}
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
            <View style={[styles.tabs,this.props.style]}>
                {this._renderTabBar()}
            </View>
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
        height:50
    },
    tab:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})

TabBar.Item = TabBarItem

export default TabBar