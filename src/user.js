import React from 'react';
import ReactDOM from 'react-dom';
import MainUserApp from './containers/user/MainUserApp';

/**
 * @see https://alligator.io/react/react-router-ssr/
 */
var UserContainer = document.getElementById("user");
 
    //If it isn't "undefined" and it isn't "null", then it exists.
if(typeof(UserContainer) != 'undefined' && UserContainer != null){
    ReactDOM.hydrate(
        <MainUserApp/>
    , UserContainer
);
} else{
    console.log('MainUserApp does not exist!');
}

