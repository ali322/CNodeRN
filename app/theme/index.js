import React, { PropTypes } from "react"
import * as defaults from "./default"
import * as dark from "./dark/"
import { mergeWith, mapValues, isEqual } from 'lodash'

const themes = {
    default: defaults,
    dark
}

function preferredTheme(userPrefs, defaultStyles) {
    let themeName = userPrefs['preferredTheme']
    let fontSize = userPrefs['preferredFontSize']
    let theme = themes[themeName] ? themes[themeName] : { styles: {}, htmlStyles: {}, constants: {} }
    let styles = mergeWith({ ...theme.styles }, defaultStyles, (dest, src) => {
        return [src, dest]
    })
    let htmlStyles = mapValues(theme.htmlStyles, (v, k) => {
        v = { ...v, fontSize }
        return v
    })
    return {
        ...theme,
        styles,
        htmlStyles
    }
}

const preferredThemer = defaultStyles => {
    return Component => class extends React.Component {
        static contextTypes = {
            userPrefs: PropTypes.object.isRequired
        }
        // shouldComponentUpdate(nextProps,nextState,nextContext){
        //     console.log('nextProps',!isEqual(nextProps,this.props))
        //     return !isEqual(nextProps,this.props) || !isEqual(nextContext,this.context)
        // }
        render() {
            const userPrefs = this.props.userPrefs || this.context.userPrefs
            const theme = preferredTheme(userPrefs, defaultStyles)
            return <Component {...this.props} {...theme}/>
        }
    }
}

export default preferredThemer