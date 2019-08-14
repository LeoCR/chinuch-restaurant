import React from 'react';
import ReactDOM from 'react-dom';
import MainCheckoutApp from './containers/checkout/MainCheckoutApp';
/**
 * @see https://alligator.io/react/react-router-ssr/
 */
 ReactDOM.hydrate(
    <MainCheckoutApp/>, document.getElementById('checkout')
);
 
