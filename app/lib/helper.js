'use strict'
import {NetInfo,Platform,StyleSheet} from "react-native"
import moment from "moment"
import codePush from "react-native-code-push"
import * as themes from "../common/stylesheet/theme"
import * as defines from "../common/stylesheet/defines"

export function fromNow(time){
    moment.updateLocale('en',{
        relativeTime : {
            future : '%s内',
            past : '%s前',
            s : '几秒',
            m : '1 分钟',
            mm : '%d 分钟',
            h : '1 小时',
            hh : '%d 小时',
            d : '1 天',
            dd : '%d 天',
            M : '1 个月',
            MM : '%d 个月',
            y : '1 年',
            yy : '%d 年'
        }
    })
    return moment(time).fromNow()
}

export function formatTime(time,format="YYYY-MM-DD"){
    return moment(time).format(format)
}

export function preferredStyles(styles,userPrefs){
    userPrefs = userPrefs || {}
    if(userPrefs["preferredTheme"] && themes[userPrefs.preferredTheme]){
        return StyleSheet.create(Object.assign({},styles,themes[userPrefs.preferredTheme]))
    }
    return StyleSheet.create(styles)
}

export function preferredThemeDefines(userPrefs){
    userPrefs = userPrefs || {}
    return userPrefs["preferredTheme"] && defines[userPrefs["preferredTheme"]] ? defines[userPrefs["preferredTheme"]] :{}
}

export function codepush(){
    NetInfo.fetch().then(info=>{
        if(__DEV__){
            return false
        }
        if(Platform.OS === "ios" && info === "wifi"){
            codePush.sync()
        }
        if(Platform.OS === "android" && ["WIFI","VPN"].indexOf(info) > -1){
            codePush.sync({updateDialog:{
                title:"更新提示",
                optionalUpdateMessage:"发现新版本,是否立刻安装?",
                mandatoryUpdateMessage:"发现重要的安全更新版本",
                optionalInstallButtonLabel:"安装",
                optionalIgnoreButtonLabel:"忽略"    
            }})
        }
    })
}