'use strict'

export default {
    get(url,data={},options){
        options = {
            caching:"permanent",
            ...options
        }
        let params = []
        Object.keys(data).forEach((param)=>{
            params.push(`${param}=${encodeURIComponent(data[param])}`)
        })
        params = params.join("&")
        url = `${url}?${params}`
        const cacheKey = "cache." + options.keyPrefix + url
        if(!options.caching){
            global.storage.getAllKeys().then(ret=>{
                global.storage.multiRemove(ret.filter(key=>key.startsWith(options.keyPrefix)))
            })
            return fetch(url).then(ret=>ret.json())
        }
        return global.storage.getItem(cacheKey).then(cached=>{
            if(cached){
                // console.log("from cached")
                return cached
            }else{
                // console.log("from fetch")
                return fetch(url).then(ret=>ret.json()).then(ret=>{
                    global.storage.setItem(cacheKey,ret)
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