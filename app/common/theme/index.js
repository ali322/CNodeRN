'use strict'
import React,{Component} from "react"
import {constants as defaultConstants} from "./default"
import {
    styles as darkStyles,
    htmlStyles as darkHtmlStyles,
    constants as darkConstants
} from "./dark"

const styles = {
    dark:darkStyles,
    light:{}
}

const htmlStyles = {
    dark:darkHtmlStyles,
    light:{}
}

const constants = {
    dark:darkConstants,
    light:defaultConstants
}

function preferredStyle(themeName) {
    return {
        styles:themeName?styles[themeName]:{},
        htmlStyles:themeName?htmlStyles[themeName]:{},
        constants:themeName?constants[themeName]:{}
    }
}

const preferredThemer = defaultStyles=>{
    return InnerComponent=>class extends Component{
        constructor(props){
            super(props)
            const _preferredStyle = preferredStyle(props.userPrefs["preferredTheme"])
            this._styles = this._mixinStyles(defaultStyles,_preferredStyle.styles)
            this._styleConstants = _preferredStyle["constants"]
            this._htmlStyles = _preferredStyle["htmlStyles"]
        }
        componentWillReceiveProps(nextProps){
            if(nextProps.userPrefs && nextProps.userPrefs !== this.props.userPrefs){
                const _preferredStyle = preferredStyle(nextProps.userPrefs["preferredTheme"])
                this._styles = this._mixinStyles(defaultStyles,_preferredStyle.styles)
                this._styleConstants = _preferredStyle["constants"]
                this._htmlStyles = _preferredStyle["htmlStyles"]
            }
        }
        _mixinStyles(originStyles,preferredStyles){
            let _styles = {}
            for(let k in originStyles){
                if(Object.keys(preferredStyles).indexOf(k) > -1){
                    _styles[k] = [originStyles[k],preferredStyles[k]]
                }else{
                    _styles[k] = originStyles[k]
                }
            }
            return _styles
        }
        render(){
            return <InnerComponent {...this.props} styles={this._styles} 
            styleConstants={this._styleConstants} htmlStyles={this._htmlStyles}/>
        }
    }
}

export default preferredThemer