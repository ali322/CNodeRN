'use strict'

export default {
    get(url,data={}){
        let params = []
        Object.keys(data).forEach((param)=>{
            params.push(`${param}=${encodeURIComponent(data[param])}`)
        })
        params = params.join("&")
        return fetch(`${url}?${params}`).then(ret=>ret.json())
    },
    post(url,data={}){
        return fetch(url,{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        }).then((ret)=>{
            if(ret.ok){
                return ret.json()
            }else{
                throw new Error(`post failed,err stack:${ret.error()}`)
            }
        })
    }
}