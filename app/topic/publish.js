'use strict'

import React,{Component,View,Text,TouchableHighlight,TouchableOpacity,TextInput,Picker,Alert} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"

import NavBar from "../common/component/navbar"

import containerByComponent from "../lib/redux-helper"
import {topicReducer} from "./reducer"
import {saveTopic,changeField} from "./action"

import styles from "./stylesheet/publish"

const topicTabs = {
    "ask":"问答",
    "share":"分享",
    "job":"招聘"
}

class Publish extends Component{
    constructor(props){
        super(props)
        this.state = {
            pickerActive:false
        }
    }
    _togglePicker(){
        this.setState({
            pickerActive:!this.state.pickerActive
        })
    }
    async _handleSave(){
        const user = await global.storage.getItem("user")
        const {topic} = this.props
        this.props.actions.saveTopic({...topic,accesstoken:user.accessToken})
    }
    componentWillReceiveProps(nextProps){
        if(!nextProps.topicSaving && this.props.topicSaving){
            if(nextProps.topicSaved){
                Alert.alert("发布成功","",[{text:"确定",onPress:()=>Actions.pop()}])
            }else{
                Alert.alert(nextProps.errMsg,"",[{text:"确定",style:"cancel"}])
            }
        }
    }
    renderNavigationBar(){
        const rightButton = (
            <TouchableOpacity style={[styles.navigationBarButton,{marginLeft:5}]} onPress={this._handleSave.bind(this)}>
                <Text style={styles.navigationBarButtonText}>确定</Text>
            </TouchableOpacity>
        )

        return <NavBar title="发布主题" rightButton={()=>rightButton} {...this.props}/>
    }
    renderModal(){
        return (
            <View style={styles.pickerWrap}>
            <Picker selectedValue={this.props.topic.tab} enabled={true} mode="dropdown"
            onValueChange={(value)=>{
                this.props.changeField("tab",value)
            }}>
            {Object.keys(topicTabs).map((tab,i)=>{
                return <Picker.Item label={topicTabs[tab]} value={tab} key={i}/>
            })}
            </Picker>
            </View>  
        )
    }
    renderForm(){
        const {topic} = this.props
        return (
            <View style={styles.publishForm}>
                <View style={styles.publishRow}>
                    <Text style={styles.publishLabel}>标题</Text>
                    <View style={styles.publishInput}>
                        <TextInput placeholder="请输入标题" style={styles.publishTextInput} 
                        onChangeText={value=>this.props.actions.changeField("title",value)}/>
                    </View>
                </View>
                <View style={styles.publishRow}>
                    <Text style={styles.publishLabel}>分类</Text>
                    <TouchableOpacity style={[styles.publishInput,styles.publishPickerInput]} onPress={this._togglePicker.bind(this)}>
                        <Text style={styles.publishPickerValue}>{topicTabs[topic.tab]}</Text>
                        <Icon name="angle-right" size={25} color="#999"/>
                    </TouchableOpacity>
                </View>
                <View style={styles.publishFormSeparator}/>
                <View style={styles.publishArea}>
                    <TextInput placeholder="请输入主题内容" style={styles.publishTextArea} 
                    onChangeText={value=>this.props.actions.changeField("content",value)}
                    multiline={true} maxLength={200}/>
                </View>
            </View>
        )
    }
    render(){
        return (
            <View style={styles.container}>
            {this.renderNavigationBar()}
            {this.renderForm()}
            {this.state.pickerActive?this.renderModal():null}
            </View>
        )
    }
}

export default containerByComponent(Publish,topicReducer,{saveTopic,changeField})
