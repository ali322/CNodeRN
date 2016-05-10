'use strict'

import React,{Component,TouchableOpacity,StyleSheet,View} from "react-native"

class Tabs extends Component{
    render(){
        let {activeTab} = this.props
        return (
            <View style={[styles.tabs,this.props.style]}>
            {React.Children.map(this.props.children,(tab,i)=>{
                return <TouchableOpacity onPress={()=>this.props.goToPage(i)} style={styles.tab}>
                {i === activeTab?React.cloneElement(tab,{
                    selected:true,
                    style:[tab.props.style,this.props.selectedStyle,tab.props.selectedStyle]}):tab}
                </TouchableOpacity>
            })}
            </View>
        )
    }
}

Tabs.defaultProps = {
    activeTab:0,
    goToPage:()=>{}
}

const styles = StyleSheet.create({
    tabs:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        height:50
    },
    tab:{
        flex:1,
        height:50,
        justifyContent:"center",
        alignItems:"center"
    }
})

export default Tabs