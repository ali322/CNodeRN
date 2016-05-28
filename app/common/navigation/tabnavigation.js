'use strict'
import React,{Component,StyleSheet,View,Text} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import TabBar from "../component/tabbar"
import Navigation from "./navigation"

class TabNavigation extends Component{
    _renderIcon(tintText,iconConfig,selected){
            return (
                <View style={styles.tabBarItem}>
                    <Icon {...iconConfig} color={selected?"blue":"#333"}/>
                    <Text style={[styles.tabBarItemText,selected?{color:"blue"}:null]}>{tintText}</Text>
                </View>
            )
        }
    render(){
        const {items} = this.props
        return (
            <TabBar>
                {items.map((item,i)=>{
                    const ItemView = item.component
                    if(!ItemView){
                        return null
                    }
                    return (
                        <TabBar.Item key={i} renderIcon={(selected)=>this._renderIcon(item.title,{name:item.iconName,size:20},selected)}>
                            <Navigation />
                            <ItemView {...this.props}/>
                        </TabBar.Item>
                    )
                })}
            </TabBar>
        )
    }
}

const styles = StyleSheet.create({
    tabBarItem: {
        flexDirection: "column",
        alignItems: "center"
    },
    tabBar: {
        backgroundColor: "#F7F7F7",
        borderTopWidth: 1,
        borderTopColor: "#DDD"
    },
    tabBarItemText: {
        fontSize: 12,
        color: "#666",
        paddingTop:3
    }
})

export default TabNavigation