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
        },
        searchBar:{
            backgroundColor:"#555"
        },
        searchBarButtonText:{
            color:"#FFF"
        },
        tabBar:{
            backgroundColor:"#353535"
        },
        tabBarItemText:{
            color:"#FFF"
        },
        tabBarSelectedItemText:{
            color:"yellow"
        }
    },
    light:{
        tabBarItemText:{
            color:"#333"
        },
        tabBarSelectedItemText:{
            color:"blue"
        }
    }
}

export default function preferredThemeByName(themeName) {
    if(!themeName){
        return {}
    }
    return StyleSheet.create(theme[themeName])
}