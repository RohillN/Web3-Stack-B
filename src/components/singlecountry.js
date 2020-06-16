import React from 'react';

const SingleCountry = ({ specificCountry }) => {
    //const { errorSingle, isLoadedSingle, countryObject } = this.specificCountry;

    console.log(specificCountry);

    return <h1>{specificCountry}</h1>;


}

export default SingleCountry;