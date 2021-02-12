import React from 'react';
import UserApp from './UserApp';
import {Provider} from "react-redux";
import store from "../../store"; 
import { BrowserRouter } from 'react-router-dom';
class MainUserApp extends React.Component {
    render(){
        return(
            <React.Fragment>
                    <BrowserRouter>
                        <Provider store={store}>
                            <UserApp/> 
                        </Provider>
                    </BrowserRouter>
            </React.Fragment>
        )
    }
}
export default MainUserApp;