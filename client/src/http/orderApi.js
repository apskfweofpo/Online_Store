import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createOrder = async (order) => {
    const {data} = await $authHost.post('api/order/add', order)
    return data
}
