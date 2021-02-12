import {combineReducers} from "redux";
import menuReducer from "./menuReducer";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";
import paypalReducer from "./paypalReducer";
import invoiceDetailReducer from "./invoiceDetailReducer";
import headerInvoiceReducer from "./headerInvoiceReducer";
export default combineReducers({
    menu:menuReducer,
    orders:cartReducer,
    user:userReducer,
    paypalItems:paypalReducer,
    invoiceDetails:invoiceDetailReducer,
    headerInvoices:headerInvoiceReducer
});