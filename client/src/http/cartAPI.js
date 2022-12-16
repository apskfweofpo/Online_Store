import {$authHost, $host} from "./index";


export const addDeviceToCart = async (deviceId) => {
    const {data} = await $authHost.post('api/cart/add',  {email: localStorage.email, deviceId})
    return data
}

export const fetchDevicesFromCart = async () => {
    const {data} = await $authHost.post('api/cart/all',  {email: localStorage.email});
    return data
}

export const deleteOneDevice = async (logId) => {
    const {data} = await $authHost.post('api/cart/delete', {email: localStorage.email, logId})
    return data
}

export const deleteAllDevices = async () =>{
    const {data} = await $authHost.post('api/cart/deleteAll', {email: localStorage.email})
    return data
}