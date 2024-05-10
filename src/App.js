import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CountryProvider } from './contexts/CountryContext';
import HomePage from './HomePage'; // Your home page component
import CountryDetailPage from './CountryDetailPage'; // Your country detail page component




const App = () => {
  return (
    <CountryProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/country/:slug" element={<CountryDetailPage />} />
        </Routes>
      </Router>
    </CountryProvider>
  );
};

export default App;
