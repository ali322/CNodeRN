'use strict'

import React,{Component} from "react"
import {Modal,StyleSheet,TouchableOpacity,Text,View} from "react-native"

import modalStyle from "../stylesheet/modal"

class Picker extends Component{
    static defaultProps = {
        selectedValue:"",
        onValueChange:()=>{}
    }
    constructor(props){
        super(props)
        this.state = {
            modalActive:props.visible
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            modalActive:nextProps.visible
        })
    }
    _handleValueChange(value){
        this.props.onValueChange(value)
    }
    _toggleModalActive(){
        this.setState({
            modalActive:!this.state.modalActive
        })
    }
    render(){
        return (
            <Modal animationType="none" visible={this.state.modalActive} transparent={true} 
            onRequestClose={this._toggleModalActive.bind(this)}>
            <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                {React.Children.map(this.props.children,(child,i)=>{
                    return React.cloneElement(child,{
                        onValueChange:this._handleValueChange.bind(this,child.props.value),
                        key:i,
                        selected:this.props.selectedValue === child.props.value
                    })
                })}
                <TouchableOpacity style={styles.modalCancelRow} onPress={this._toggleModalActive.bind(this)}>
                    <Text style={[styles.modalRowText,{color:"red"}]}>取消</Text>
                </TouchableOpacity>
            </View>
            </View>
            </Modal>
        )
    }
}

class PickerItem extends Component{
    render(){
        const {key,selected,onValueChange,label} = this.props
        return (
            <TouchableOpacity key={key} style={styles.modalRow} onPress={onValueChange}>
                <Text style={[styles.modalRowText,selected?styles.modalSelectedRowText:null]}>{label}</Text>
            </TouchableOpacity>
        )
    }
}

Picker.Item = PickerItem

const styles = StyleSheet.create({
    ...modalStyle,
    modalRow:{
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        // lineHeight:20,
        paddingVertical:8
    },
    modalRowText:{
        fontSize:16
    },
    modalSelectedRowText:{
        color:"blue"
    },
    modalCancelRow:{
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        // lineHeight:20,
        paddingVertical:10,
        borderTopWidth:0.5,
        borderColor:"#DDD"
    }
})

export default Picker