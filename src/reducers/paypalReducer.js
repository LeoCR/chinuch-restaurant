import {ADD_PAYPAL_ITEMS_TO_CART,DELETE_PAYPAL_ITEMS_FROM_CART,CLEAR_PAYPAL_ITEMS} from "../constants/paypalTypes";
const initialState = {
    paypalItems: []
};
export default function(state = initialState, action) {
    switch(action.type) {
        case ADD_PAYPAL_ITEMS_TO_CART:
            return{
                ...state,
                paypalItems:[
                    ...state.paypalItems, action.payload
                ]
            }
        case DELETE_PAYPAL_ITEMS_FROM_CART:
            return {
                ...state,
                paypalItems: state.paypalItems.filter(item => item.sku !== action.payload)
            }
        case CLEAR_PAYPAL_ITEMS:
            return{
                ...state,
                paypalItems:[]
            }
        default:
            return state;
    }
}