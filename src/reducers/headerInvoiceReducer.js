import {SET_HEADERINVOICES,CLEAR_HEADERINVOICES} from "../constants/headerInvoicesTypes";
const initialState = {
    headerInvoices: []
};
export default function(state = initialState, action) {
    switch(action.type) {
        case SET_HEADERINVOICES:
            return{
                ...state,
                headerInvoices: [action.payload]
            }
        case CLEAR_HEADERINVOICES:
            return{
                ...state,
                headerInvoices:[]
            }
        default:
            return state;
    }
}