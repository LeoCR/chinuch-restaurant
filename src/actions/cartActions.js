import { ADD_TO_CART,DELETE_FROM_CART,UPDATE_ITEM_UNITS,SHOW_ORDERS,SET_ORDERS,DELETE_ORDERS} from "../constants/cartTypes";
export const setOrders=(orders)=>{
    return{
        type:SET_ORDERS,
        payload:orders
    }
}
export const addToCart = (order) => {
    return {
        type: ADD_TO_CART,
        payload: order
    };
};
export const deleteFromCart=(id)=> {
    return {
        type: DELETE_FROM_CART,
        payload: id
    }
}
export const getOrders = () => {
    return {
        type: SHOW_ORDERS
    };
};
export function updateItemUnits(order) {
    return {
        type: UPDATE_ITEM_UNITS,
        payload:order
    }
}
export const deleteOrders = () => {
    return {
        type: DELETE_ORDERS
    };
};