import {combineReducers} from "redux";
import menuReducer from "./menuReducer";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";
export default combineReducers({
    menu:menuReducer,
    orders:cartReducer,
    user:userReducer
});