import React, { PropTypes } from 'react'
import { NavigationActions } from 'react-navigation'

export function mapProps(...propNames) {
    return Component => {
        return class extends React.Component {
            render() {
                let mapper = {}
                propNames.forEach(v => {
                    if (this.props[v]) {
                        mapper = { ...mapper, ...(this.props[v]) }
                    }
                })
                return <Component {...this.props} {...mapper}/>
            }
        }
    }
}

export function navUtil(options = {}) {
    return Component => {
        return class extends React.Component {
            static navigationOptions = options
            render() {
                const { navigation } = this.props
                let reset = (path = ['home']) => {
                    let resetAction = NavigationActions.reset({
                        index: path.length - 1,
                        actions: path.map(v => {
                            return NavigationActions.navigate({ routeName: v })
                        })
                    })
                    navigation.dispatch(resetAction)
                }
                return <Component {...this.props} navigation={{...navigation,reset}}/>
            }
        }
    }
}

export const  loginRequired = Component=>class extends React.Component{
    static contextTypes = {
        auth: PropTypes.object.isRequired
    }
    componentWillMount() {
        const { auth } = this.context
        const { navigate } = this.props.navigation
        if (!auth.isLogined) {
            navigate('login')
        }
    }
    render() {
        return <Component {...this.props}/>
    }
}