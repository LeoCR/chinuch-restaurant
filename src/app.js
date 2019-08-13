import React from 'react';
import ReactDOM from 'react-dom';
import MainApp from './containers/MainApp';

/**
 * @see https://alligator.io/react/react-router-ssr/
 */
ReactDOM.hydrate(
        <MainApp/>
    , document.getElementById('menu-container')
);

