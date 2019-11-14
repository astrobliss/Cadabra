import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SearchForm from './SearchForm.js';

const headerStyle = {
    fontSize: '120',
    border: 'dashed purple 5px'
}

ReactDOM.render(
    <h1 style={headerStyle}> Cadabra </h1>,
    document.getElementById('root')
);

ReactDOM.render(
    <SearchForm />,
    document.getElementById('search')
);