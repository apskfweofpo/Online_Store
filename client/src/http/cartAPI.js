import {$authHost, $host} from "./index";


export const addDeviceToCart = async (deviceId) => {
    const {data} = await $authHost.post('api/cart/add',  {email: localStorage.email, deviceId})
    return data
}

export const fetchDevicesFromCart = async () => {
    const {data} = await $authHost.post('api/cart/all',  {email: localStorage.email});
    return data
}

export const deleteOneDevice = async (deviceId) => {
    const {data} = await $authHost.post('api/cart/delete',{params: {email: localStorage.email, deviceId}})
    return data
}