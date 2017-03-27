import React,{Component} from "react"
import {constants as defaultConstants,htmlStyles as defaultHtmlStyles} from "./default"
import {
    styles as darkStyles,
    htmlStyles as darkHtmlStyles,
    constants as darkConstants
} from "./dark/"

const styles = {
    dark:darkStyles,
    default:{}
}

const htmlStyles = {
    dark:darkHtmlStyles,
    default:defaultHtmlStyles
}

const constants = {
    dark:darkConstants,
    default:defaultConstants
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
            this._styles = {}
            this._styleConstants = {}
            this._htmlStyles = {}
            if(props.userPrefs){
                const _preferredStyle = preferredStyle(props.userPrefs["preferredTheme"],props.userPrefs["preferredFontSize"])
                this._styles = this._mixinStyles(defaultStyles,_preferredStyle.styles)
                this._styleConstants = _preferredStyle["constants"]
                this._htmlStyles = this._mixinHtmlStyles(_preferredStyle["htmlStyles"],props.userPrefs["preferredFontSize"])
            }
        }
        componentWillReceiveProps(nextProps){
            if(nextProps.userPrefs && nextProps.userPrefs !== this.props.userPrefs){
                const _preferredStyle = preferredStyle(nextProps.userPrefs["preferredTheme"],nextProps.userPrefs["preferredFontSize"])
                this._styles = this._mixinStyles(defaultStyles,_preferredStyle.styles)
                this._styleConstants = _preferredStyle["constants"]
                this._htmlStyles = this._mixinHtmlStyles(_preferredStyle["htmlStyles"],nextProps.userPrefs["preferredFontSize"])
            }
        }
        _mixinStyles(originStyles,preferredStyles,preferredFontSize){
            let _styles = {}
            for(let k in originStyles){
                let originStyle = originStyles[k]
                if(Object.keys(preferredStyles).indexOf(k) > -1){
                    _styles[k] = [originStyle,preferredStyles[k]]
                }else{
                    _styles[k] = originStyle
                }
            }
            return _styles
        }
        _mixinHtmlStyles(htmlStyles,preferredFontSize){
            let _styles = {}
            for(let k in htmlStyles){
                const htmlStyle = htmlStyles[k]
                if(Object.keys(htmlStyle).indexOf("fontSize") > -1){
                    _styles[k] = {...htmlStyle,fontSize:preferredFontSize}
                }else{
                    _styles[k] = htmlStyle
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