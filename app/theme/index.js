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
        constructor(props) {
            super(props)
            if (props.userPrefs) {
                this.state = {
                    theme: preferredTheme(props.userPrefs, defaultStyles)
                }
            }
        }
        componentWillMount() {
            if (!this.state) {
                this.setState({
                    theme: preferredTheme(this.context.userPrefs, defaultStyles)
                })
            }
        }
        componentWillReceiveProps(nextProps, nextContext) {
            if (nextProps.userPrefs && !isEqual(nextProps.userPrefs, this.props.userPrefs)) {
                this.setState({ theme: preferredTheme(nextProps.userPrefs, defaultStyles) })
            }
            if(!isEqual(nextContext.userPrefs, this.context.userPrefs)){
                this.setState({ theme: preferredTheme(nextContext.userPrefs, defaultStyles) })
            }
        }
        render() {
            return <Component {...this.props} {...this.state.theme} />
        }
    }
}

export default preferredThemer