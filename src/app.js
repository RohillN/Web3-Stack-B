import React from 'react';
import LikeButton from './components/like_button';
import AppNavbar from './components/appnavbar';
import Countries from './components/countries';

function App() {

    return (
        <div>
            <AppNavbar />
            {/* <LikeButton /> */}
            <div className="container">
            <Countries />
            </div>
        </div>
    );
}

export default App;
