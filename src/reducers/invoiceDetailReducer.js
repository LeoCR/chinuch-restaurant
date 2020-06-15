import {SET_INVOICEDETAILS,CLEAR_INVOICEDETAILS} from "../constants/invoiceDetailTypes";
const initialState = {
    invoiceDetails: []
};
export default function(state = initialState, action) {
    switch(action.type) {
        case SET_INVOICEDETAILS:
            return{
                ...state,
                invoiceDetails: [action.payload]
            }
        case CLEAR_INVOICEDETAILS:
            return{
                ...state,
                invoiceDetails:[]
            }
        default:
            return state;
    }
}