'use strict'

export default {
    get(url,data){
        var params = new URLSearchParams()
        data.keys.forEach((param)=>{
            params.append(param,data[param])
        })
        return fetch(`${url}?${params}`).then(ret=>ret.json)
    },
    post(url,data){
        return fetch(url,{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        }).then((ret)=>ret.json())
    }
}