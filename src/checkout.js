import React from 'react';
import ReactDOM from 'react-dom';
import MainCheckoutApp from './containers/checkout/MainCheckoutApp';
/**
 * @see https://alligator.io/react/react-router-ssr/
 */
var CheckoutContainer = document.getElementById("checkout");
 
    //If it isn't "undefined" and it isn't "null", then it exists.
if(typeof(CheckoutContainer) != 'undefined' && CheckoutContainer != null){
    ReactDOM.hydrate(
        <MainCheckoutApp/>
    , CheckoutContainer
);
} else{
    console.log('Element does not exist!');
}
 
