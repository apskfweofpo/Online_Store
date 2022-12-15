import {makeAutoObservable} from "mobx";
import {type} from "@testing-library/user-event/dist/type";

export default class CartStore {
    constructor() {
        this._cartItems = []
        this._totalCount = 0
        makeAutoObservable(this)

    }
    
    setItems(devices) {
        this._cartItems = devices
    }
    
    setTotalCount(count) {
        this._totalCount = count
    }

    
    get cartItems() {
        return this._cartItems
    }
    
    get totalCount() {
        return this._totalCount
    }
    
}