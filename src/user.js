import React from 'react';
import ReactDOM from 'react-dom';
import MainUserApp from './containers/user/MainUserApp';

/**
 * @see https://alligator.io/react/react-router-ssr/
 */
ReactDOM.hydrate(
        <MainUserApp/>
    , document.getElementById('user')
);

