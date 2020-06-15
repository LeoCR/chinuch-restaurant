import {SET_INVOICEDETAILS,CLEAR_INVOICEDETAILS} from "../constants/invoiceDetailTypes";
export const setInvoiceDetails = (invoiceDetail) => {
    return {
        type: SET_INVOICEDETAILS,
        payload: invoiceDetail
    };
};
export const clearInvoiceDetails=()=>{
    return {
        type:CLEAR_INVOICEDETAILS
    };
}