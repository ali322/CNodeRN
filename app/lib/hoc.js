import React from 'react'

export function mapProps(...propNames) {
    return Component => {
        return class extends React.Component {
            render() {
                let mapper = {}
                propNames.forEach(v => {
                    if(this.props[v]){
                        mapper = { ...mapper, ...(this.props[v]) }
                    }
                })
                return <Component {...this.props} {...mapper}/>
            }
        }
    }
}