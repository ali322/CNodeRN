'use strict'

import React,{Component,View} from "react-native"
import TabNavigator from "react-native-tab-navigator"
import _ from "lodash"

class TabBar extends Component{
    static defaultProps = {
        selectedIndex:0,
        onSelect:()=>{}
    }
    constructor(props){
        super(props)
        this.state = {
            selectedIndex:props.selectedIndex
        }
    }
    _handleSelect(item,index){
        this.setState({
            selectedIndex:index
        },()=>this.props.onSelect(item))
    }
    _renderTab(item,index){
        const props = _.pick(item.props,["title","tabStyle","renderIcon"])
        const renderIcon = props.renderIcon || (()=>null)
        return <TabNavigator.Item key={index} onPress={this._handleSelect.bind(this,item,index)} 
        renderIcon={()=>renderIcon()} renderSelectedIcon={()=>renderIcon(true)} titleStyle={{height:0}} title="title"
        {...props} selected={this.state.selectedIndex === index}
        >{item}</TabNavigator.Item>
    }
    render(){
        const sceneStyle = {paddingBottom:0}
        return (
            <TabNavigator sceneStyle={sceneStyle}
            >{React.Children.map(this.props.children,this._renderTab.bind(this))}</TabNavigator>
        )
    }
}

class TabBarItem extends Component{
    render(){
        const child = React.Children.only(this.props.children)
        return React.cloneElement(child)
    }
}

TabBar.Item = TabBarItem

export default TabBar