'use strict'

export default {
    get(url,data={},options={
        caching:"permanent"
    }){
        let params = []
        Object.keys(data).forEach((param)=>{
            params.push(`${param}=${encodeURIComponent(data[param])}`)
        })
        params = params.join("&")
        url = `${url}?${params}`
        if(!options.caching){
            return fetch(url).then(ret=>ret.json())
        }
        return global.storage.getItem(url).then(cached=>{
            if(cached){
                return cached
            }else{
                return fetch(url).then(ret=>ret.json()).then(ret=>{
                    global.storage.setItem(url)
                    return ret
                })
            }
        })
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
                throw new Error(`post failed,err stack:${ret.error?ret.error():""}`)
            }
        })
    }
}