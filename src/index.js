import React from 'react';
import ReactDOM from 'react-dom';
import LikeButton from '../src/like_button';
import AppNavbar from '../src/appnavbar';

const title = 'My Minimal React Webpack Babel Setup';

ReactDOM.render(
<div>{title}</div>,
document.getElementById('app')
);

let domContainer = document.querySelector('#app');
ReactDOM.render(<AppTest />, domContainer);