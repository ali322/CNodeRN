import {AsyncStorage} from "react-native"

class Storge{
    constructor(){
        this._storage = AsyncStorage
    }
    getItem(key){
        return this._storage.getItem(key).then(ret=>JSON.parse(ret))
    }
    setItem(key,value){
        return this._storage.setItem(key,JSON.stringify(value))
    }
    removeItem(key){
        return this._storage.removeItem(key)
    }
    getAllKeys(){
        return this._storage.getAllKeys()
    }
    clear(){
        return this._storage.clear()
    }
    multiRemove(keys){
        return this._storage.multiRemove(keys)
    }
}

export default Storge