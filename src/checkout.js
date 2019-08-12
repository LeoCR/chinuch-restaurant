import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import {Provider} from "react-redux";
import store from "./store"; 
import { BrowserRouter } from 'react-router-dom';
/**
 * @see https://alligator.io/react/react-router-ssr/
 */
ReactDOM.hydrate(
    <div>User    </div>, document.getElementById('user')
);

