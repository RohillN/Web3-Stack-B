import React from 'react';
import LikeButton from './components/like_button';
import AppNavbar from './components/appnavbar';
import Countries from './components/countries';
import About from './components/about';

function App() {

    //will return the navbar, about and countries componets to the index.js
    return (
        <div>
            <AppNavbar />
            <About />
            {/* <LikeButton /> */}
            <div className="container">
            <Countries />
            </div>
        </div>
    );
}

export default App;
