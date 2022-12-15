import {$authHost, $host} from "./index";


export const addDeviceToCart = async (item) => {
    const {data} = await $authHost.post('api/cart', item)
    return data
}

export const fetchDevicesFromCart = async () => {
    const {data} = await $host.get('api/cart');
    return data
}

export const deleteOneDevice = async (id) => {
    const {data} = await $host.delete('api/cart/' + id)
    return data
}