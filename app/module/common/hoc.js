import React, { PropTypes } from 'react'
import { NavigationActions } from 'react-navigation'
import OffLine from './screen/offline'
import BadRequest from './screen/badrequest'

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

export const loginRequired = Component => class extends React.Component {
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
        const { auth } = this.context
        if(!auth.isLogined){
            return null
        }
        return <Component {...this.props}/>
    }
}

export const offline = Component => class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isConnected: null
        }
        this._handleNetInfoChange = this._handleNetInfoChange.bind(this)
    }
    componentDidMount() {
        NetInfo.isConnected.addEventListener("change", this._handleNetInfoChange)
        NetInfo.isConnected.fetch().done(isConnected => {
            this.setState({ isConnected })
        })
    }
    _handleNetInfoChange(isConnected) {
        this.setState({
            isConnected
        })
    }
    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('change', this._handleNetInfoChange)
    }
    render() {
        if (this.state.isConnected === null) {
            return null
        }
        return !this.state.isConnected ? <OffLine {...this.props}/> : <Component {...this.props}/>
    }
}

export const badRequest = Component => class extends React.Component {
    render() {
        const { requestFailed } = this.props
        if (requestFailed) {
            return <BadRequest />
        }
        return <Component {...this.props} />
    }
}