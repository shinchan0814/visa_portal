// src/contexts/CountryContext.js
import React, { createContext, useState, useEffect } from 'react';

export const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetch('FinalDataCountry.json')
            .then(response => response.json())
            .then(data => setCountries(data))
            .catch(error => console.error('Failed to load country data', error));
    }, []);

    return (
        <CountryContext.Provider value={countries}>
            {children}
        </CountryContext.Provider>
    );
};
