import React from 'react';
import CheckoutApp from './CheckoutApp';
import {Provider} from "react-redux";
import store from "../../store"; 
import { BrowserRouter } from 'react-router-dom';
class MainCheckoutApp extends React.Component {
    render(){
        return(
            <React.Fragment>
                    <BrowserRouter>
                        <Provider store={store}>
                            <CheckoutApp/> 
                        </Provider>
                    </BrowserRouter>
            </React.Fragment>
        )
    }
}
export default MainCheckoutApp;