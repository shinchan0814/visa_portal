// App.js
import React, { useState, useEffect } from 'react';
import CountryCard from './CountryCard';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import './App.css'; // Make sure to create this CSS file for additional styles

const App = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [visaFilter, setVisaFilter] = useState('');
  const [visibleCountries, setVisibleCountries] = useState(30); // Initial number of visible countries
  const visaTypes = ['E-visa', 'Visa on Arrival', 'Visa Free', 'Visa Required'];

  useEffect(() => {
    // Fetch the JSON data from the public folder
    fetch('/output.json')
      .then((response) => response.json())
      .then((data) => setCountriesData(data))
      .catch((error) => console.error('Error loading the JSON data:', error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleVisaFilterChange = (type) => {
    setVisaFilter(type);
  };

  const filteredCountries = countriesData.filter(
    (country) =>
      (country.countryName.toLowerCase().includes(searchTerm) || !searchTerm) &&
      (visaFilter === '' || country.visaType === visaFilter)
  );

  const showMoreCountries = () => {
    setVisibleCountries((prevVisibleCountries) => prevVisibleCountries + 30); // Show 30 more countries
  };

  return (
    <Box sx={{ backgroundColor: 'whitesmoke', p: 4, borderRadius: '8px', margin: '16px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
        <TextField
          fullWidth
          label="Search for a country"
          variant="outlined"
          onChange={handleSearchChange}
          size="medium"
          sx={{ mr: 2, backgroundColor: 'white' }}
        />
        <Box>
          {visaTypes.map((type) => (
            <Chip
              key={type}
              label={type}
              onClick={() => handleVisaFilterChange(type)}
              variant={visaFilter === type ? 'filled' : 'outlined'}
              sx={{ ml: 1 }}
            />
          ))}
        </Box>
      </Box>
      <Grid container spacing={2}>
        {filteredCountries.slice(0, visibleCountries).map((country, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <CountryCard
              countryName={country.countryName}
              visaType={country.visaType}
              details={country.details}
              imageUrl={country.imageUrl}
            />
          </Grid>
        ))}
      </Grid>
      {visibleCountries < filteredCountries.length && (
        <Button onClick={showMoreCountries} variant="contained" sx={{ mt: 4, width: '100%' }}>
          Show More...
        </Button>
      )}
    </Box>
  );
};

export default App;
