import { ADD_PAYPAL_ITEMS_TO_CART,DELETE_PAYPAL_ITEMS_FROM_CART,CLEAR_PAYPAL_ITEMS} from "../constants/paypalTypes";
export const addPaypalItemsToCart = (item) => {
    return {
        type: ADD_PAYPAL_ITEMS_TO_CART,
        payload: item
    };
};
export const deletePaypalItemsFromCart=(sku)=> {
    return {
        type: DELETE_PAYPAL_ITEMS_FROM_CART,
        payload: sku
    }
}
export const clearPaypalItems=()=>{
    return{
        type:CLEAR_PAYPAL_ITEMS
    }
}