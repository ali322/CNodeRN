'use strict'

import React,{Component,StyleSheet,View,Text,TouchableOpacity,Dimensions} from "react-native"
import CodePush from "react-native-code-push"
import * as Progress from 'react-native-progress'
import Toast from "../common/component/toast"
import NavBar from "../common/component/navbar"

import containerByComponent from "../lib/redux-helper"
import rootReducer from "./reducer"
import {fetchUserPrefs} from "./action"

class Updater extends Component{
    constructor(props){
        super(props)
        this.state = {
            syncMessage:""
        }
    }
    componentDidMount() {
        CodePush.notifyApplicationReady()
    }
    async _updateFromCodePush(){
        const self = this
        try{
            return await CodePush.sync({
                installMode: CodePush.InstallMode.IMMEDIATE,
            },syncStatus=>{
                switch(syncStatus) {
                    case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                    self.setState({
                        syncMessage: "检查更新中..."
                    });
                    break;
                    case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                    self.setState({
                        syncMessage: "更新包下载中..."
                    });
                    break;
                    case CodePush.SyncStatus.AWAITING_USER_ACTION:
                    self.setState({
                        syncMessage: "等待中..."
                    });
                    break;
                    case CodePush.SyncStatus.INSTALLING_UPDATE:
                    self.setState({
                        syncMessage: "安装更新包..."
                    });
                    break;
                    case CodePush.SyncStatus.UP_TO_DATE:
                    self.setState({
                        syncMessage: "已是最新版本",
                        progress: false
                    });
                    break;
                    case CodePush.SyncStatus.UPDATE_IGNORED:
                    self.setState({
                        syncMessage: "更新已暂停",
                        progress: false
                    });
                    break;
                    case CodePush.SyncStatus.UPDATE_INSTALLED:
                    self.setState({
                        syncMessage: "更新安装成功,下次重启更新生效",
                        progress: false
                    });
                    break;
                    case CodePush.SyncStatus.UNKNOWN_ERROR:
                    self.setState({
                        syncMessage: "未知的错误",
                        progress: false
                    });
                    break;
                }
            },progress=>{
                this.setState({progress})
            })
        }catch(e){
            CodePush.log(e)
            this._toast.show("更新服务器异常")
        }
    }
    renderProgress(){
        const {progress} = this.state
        if(!progress){
            return null
        }
        const scale = progress.receivedBytes / progress.totalBytes
        return <Progress.Bar progress={scale} width={200} color="#666" borderColor="#666"/>
    }
    render(){
        return (
            <View style={styles.container}>
            <NavBar title="" {...this.props}/>
            <View style={styles.updaterContainer}>
                <View style={styles.updaterBreif}>{this.state.progress?this.renderProgress():<Text style={styles.updaterBreifText}>{this.state.syncMessage}</Text>}</View>
                <View style={styles.updaterButtons}>
                    <TouchableOpacity style={styles.updaterButton} onPress={this._updateFromCodePush.bind(this)}><Text style={styles.updaterButtonText}>检查更新</Text></TouchableOpacity>
                </View>
            </View>
                {this.renderProgress()}
            <Toast ref={view=>this._toast=view}/>
            </View>
        )
    }
}

const stylesForAll = {
    container:{
        flex:1
    },
    updaterContainer:{
        backgroundColor:"#FFF",
        marginVertical:10,
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    updaterBreif:{
        paddingVertical:10
    },
    updaterBreifText:{
        color:"#666"  
    },
    updaterButtons:{
        paddingVertical:8
    },
    updaterButton:{
        paddingVertical:6,
        paddingHorizontal:10,
        borderRadius:5,
        borderColor:"#666",
        borderWidth:0.5
    },
    updaterButtonText:{
        color:"#999",
        fontSize:14
    },
}

const styles = StyleSheet.create(Object.assign({},stylesForAll))

export default containerByComponent(Updater,rootReducer,{fetchUserPrefs},null,(state)=>({...state.userPrefsReducer}))