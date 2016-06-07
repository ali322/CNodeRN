'use strict'

import {StyleSheet} from "react-native"

export const theme = {
    dark:{
        header:{
            backgroundColor:"#555"
        },
        navigationBarTitleText:{
            color:"#FFF"
        },
        navigationBarButtonText:{
            color:"#FFF"
        }
    }
}

export default function preferredThemeByName(themeName) {
    if(!themeName){
        return {}
    }
    return StyleSheet.create(theme[themeName])
}