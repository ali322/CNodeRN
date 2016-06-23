'use strict'

import React,{Component} from "react"
import {View,Text,TouchableHighlight,TouchableOpacity,TextInput} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import NavBar from "../common/component/navbar"
import Picker from "../common/component/picker"
import Alert from "../common/component/alert"

import containerByComponent from "../lib/redux-helper"
import {topicReducer} from "./reducer"
import {saveTopic,changeField,fetchTopics} from "./action"

import defaultStyles from "./stylesheet/publish"
import preferredThemer from "../common/theme"

const topicTabs = {
    "ask":"问答",
    "share":"分享",
    "job":"招聘"
}

@preferredThemer(defaultStyles)
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
    _handleSave(){
        const {user} = this.props
        const {topic} = this.props
        this.props.actions.saveTopic({...topic,accesstoken:user.accessToken})
    }
    componentWillReceiveProps(nextProps){
        if(!nextProps.topicSaving && this.props.topicSaving){
            const {popScene,reloadScene} = this.props.navigationActions
            if(nextProps.topicSaved){
                this._alert.alert("发布成功","",[
                    {text:"确定",onPress:popScene}
                ])
                this.props.actions.fetchTopics()
            }else{
                this._alert.alert("发布失败","",[
                    {text:"确定",style:"cancel"}
                ])
            }
        }
    }
    renderNavigationBar(){
        const {styles} = this.props
        const {popScene} = this.props.navigationActions
        const rightButton = (
            <TouchableOpacity style={[styles.navigationBarButton,{marginLeft:5}]} onPress={this._handleSave.bind(this)}>
                <Text style={[styles.navigationBarButtonText]}>确定</Text>
            </TouchableOpacity>
        )

        return <NavBar title="发布主题" rightButton={()=>rightButton} onLeftButtonClick={popScene} userPrefs={this.props.userPrefs}/>
    }
    renderModal(){
        const {styles} = this.props
        return (
            <View style={styles.pickerWrap}>
            <Picker selectedValue={this.props.topic.tab} visible={this.state.pickerActive} 
            onValueChange={(value)=>{
                this.props.actions.changeField("tab",value)
                this._togglePicker()
            }}>
            {Object.keys(topicTabs).map((tab,i)=>{
                return <Picker.Item label={topicTabs[tab]} value={tab} key={i}/>
            })}
            </Picker>
            </View>  
        )
    }
    renderForm(){
        const {topic,styles,styleConstants} = this.props
        return (
            <View style={styles.publishForm}>
                <View style={styles.publishRow}>
                    <Text style={styles.publishLabel}>标题</Text>
                    <View style={styles.publishInput}>
                        <TextInput placeholder="请输入标题" placeholderTextColor={styleConstants.publishLabelColor} 
                        style={styles.publishTextInput} 
                        onChangeText={value=>this.props.actions.changeField("title",value)}/>
                    </View>
                </View>
                <View style={[styles.publishRow,{borderBottomWidth:0}]}>
                    <Text style={styles.publishLabel}>分类</Text>
                    <TouchableOpacity style={[styles.publishInput,styles.publishPickerInput]} onPress={this._togglePicker.bind(this)}>
                        <Text style={styles.publishPickerValue}>{topicTabs[topic.tab]}</Text>
                        <Icon name="angle-right" size={25} color="#999"/>
                    </TouchableOpacity>
                </View>
                <View style={styles.publishFormSeparator}/>
                <View style={styles.publishArea}>
                    <TextInput placeholder="请输入主题内容" style={styles.publishTextArea}  
                    placeholderTextColor={styleConstants.publishLabelColor} 
                    onChangeText={value=>this.props.actions.changeField("content",value)}
                    multiline={true} maxLength={200}/>
                </View>
            </View>
        )
    }
    render(){
        const {styles} = this.props
        return (
            <View style={styles.container}>
            {this.renderNavigationBar()}
            {this.renderForm()}
            {this.renderModal()}
            <Alert ref={view=>this._alert=view}/>
            </View>
        )
    }
}

export default containerByComponent(Publish,topicReducer,{saveTopic,changeField,fetchTopics})
