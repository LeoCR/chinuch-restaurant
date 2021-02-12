import React from 'react';
import ReactDOM from 'react-dom';
import MainApp from './containers/MainApp';

/**
 * @see https://alligator.io/react/react-router-ssr/
 */
var AppContainer = document.getElementById("menu-container");
 
    //If it isn't "undefined" and it isn't "null", then it exists.
if(typeof(AppContainer) != 'undefined' && AppContainer != null){
    ReactDOM.hydrate(
        <MainApp/>
    , AppContainer
);
} else{
    console.log('AppContainer does not exist!');
}


