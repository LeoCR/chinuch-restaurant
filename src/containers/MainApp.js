import React from 'react';
import App from './App';
import {Provider} from "react-redux";
import store from "../store"; 
import { BrowserRouter } from 'react-router-dom';
class MainApp extends React.Component {
    render(){
        return(
            <React.Fragment>
                    <BrowserRouter>
                        <Provider store={store}>
                            <App/> 
                        </Provider>
                    </BrowserRouter>
            </React.Fragment>
        )
    }
}
export default MainApp;