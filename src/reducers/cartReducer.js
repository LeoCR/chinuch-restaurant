import {ADD_TO_CART,DELETE_FROM_CART,UPDATE_ITEM_UNITS,SHOW_ORDERS} from "../constants/cartTypes";
const initialState = {
    orders: []
};
export default function(state = initialState, action) {
    switch(action.type) {
        case ADD_TO_CART:
            return{
                ...state,
                orders: [...state.orders, action.payload]
            }
        case DELETE_FROM_CART:
            return {
                ...state,
                orders: state.orders.filter(order => order.id !== action.payload)
            }
        case SHOW_ORDERS:
            return {
                ...state
            }
        case UPDATE_ITEM_UNITS:
            return {
                ...state,
                orders: state.orders.map(
                    order => order.id === action.payload.id
                    ? (order = action.payload)
                    : order
                )
            }
        default:
            return state;
    }
}