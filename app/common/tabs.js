'use strict'

import React,{Component,TouchableOpacity,StyleSheet,View} from "react-native"

class Tabs extends Component{
    render(){
        let {selected} = this.props
        if(!selected){
            selected = this.props.children[0].name
        }
        return (
            <View style={[styles.tabs,this.props.style]}>
            {React.Children.map(this.props.children,(tab)=>{
                return <TouchableOpacity onPress={()=>this.props.onSelect(tab)} style={styles.tab}>
                {selected === (tab.props.name)?React.cloneElement(tab,{
                    selected:true,
                    style:[tab.props.style,this.props.selectedStyle,tab.props.selectedStyle]}):tab}
                </TouchableOpacity>
            })}
            </View>
        )
    }
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