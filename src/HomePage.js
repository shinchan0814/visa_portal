import React, { useState, useEffect } from 'react';
import CountryCard from './CountryCard';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import './App.css';

const App = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [countries, setCountries] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [visaFilters, setVisaFilters] = useState(['All']);
  const visaTypes = ['All', 'E-visa', 'Visa on Arrival', 'Visa Free', 'Visa Required'];
  const [stickySearchBar, setStickySearchBar] = useState(false);
  const [stickyVisaFilters, setStickyVisaFilters] = useState(false);

  useEffect(() => {
    fetch('./data/FinalDataCountry.json')
      .then(response => response.json())
      .then(data => setCountriesData(data))
      .catch(error => console.error('Error loading the JSON data:', error));

    const handleScroll = () => {
      const searchBarOffset = document.getElementById('searchBar').getBoundingClientRect().top;
      setStickySearchBar(window.scrollY > searchBarOffset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleVisaFilterChange = (type) => {
    if (type === 'All') {
      setVisaFilters(['All']);
    } else {
      setVisaFilters(prevFilters => {
        if (prevFilters.includes('All')) {
          return [type];
        } else {
          const newFilterList = prevFilters.includes(type) ?
            prevFilters.filter(filter => filter !== type) :
            [...prevFilters, type];
          return newFilterList.length === 0 ? ['All'] : newFilterList;
        }
      });
    }
  };

  const filteredCountries = countriesData.filter(country =>
    (visaFilters.includes('All') || visaFilters.includes(country.visaType)) &&
    country.countryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{
        backgroundImage: 'url("images/  ")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '30vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/* Header */}
        <Box
          sx={{
            width: '100%',
            height: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '3px 35px', // Adjusted padding for spacing
            backgroundColor: '#fff', // Adjusted background color
            position: 'fixed', // Changed to fixed positioning
            top: 0,
            zIndex: 1200,
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', gap: '9px', padding: '0px 0px 0px 61px', alignItems: 'end' }}>
            <img src="images/website/Logo.jpg" alt="Logo" style={{ width: '28.24px', height: '46px', justifyContent: 'center' }} />
            <div style={{ alignItems: 'baseline', display: 'flex', gap: '7px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '36px', color: 'rgba(96, 92, 212, 212)', padding: '0px 0px' }}>Saathi</div>
              <div style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)' }}>Visa</div>
            </div>
          </div>

          {/* Text sections */}
          <div style={{ display: 'flex', gap: '35px', padding: '5px 25px 0px 0px' }}>
            {/* Text section 1 */}
            <div style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)' }}>Get Visa</div>
            {/* Text section 2 */}
            <div style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)' }}>Saathi App</div>
            {/* Text section 3 */}
            <div style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)' }}>Partners</div>
            {/* Text section 4 */}
            <div style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)' }}>Creators</div>
            {/* Text section 5 */}
            <div style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)' }}>Blog</div>
          </div>
        </Box>


        <Box sx={{ position: 'relative' }}>
          <img src="/images/website/back_cover.jpg" alt="Twitter Cover" style={{ width: '100vw', height: 360 }} />
          <Box
            id="searchBar"
            sx={{
              position: 'absolute',
              top: '63%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1100,
              width: 520,
              height: 47, // Adjusted height to 45px
              padding: '1px 7px 11px', // Adjusted padding
              backgroundColor: 'white',
              borderRadius: 30,
              boxShadow: stickySearchBar ? '0 2px 5px rgba(0,0,0,0.1)' : 'none',
              display: 'flex',
              alignItems: 'center', // Center vertically
              justifyContent: 'center', // Center horizontally
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <TextField
                variant="standard"
                label="📍 India"
                disabled
                InputProps={{
                  disableUnderline: true
                }}
                InputLabelProps={{
                  style: { textAlign: 'center', color: 'black' } // Center-align the label text
                }}
                sx={{
                  width: 130,
                  backgroundColor: 'white',
                  borderRadius: 1,
                  '& .MuiInputLabel-root': { // Selecting the label element
                    textAlign: 'left', // Center-align the label text
                  }
                }}
              />
              <Autocomplete
                disablePortal
                options={countriesData.map(country => country.countryName)}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    label="✈️     Where to..."
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                  />
                }
                onInputChange={(event, newInputValue) => {
                  setSearchTerm(newInputValue);
                }}
                sx={{
                  width: 300,
                  backgroundColor: 'white',
                  borderRadius: 1,
                  '& .MuiInputLabel-root': { // Selecting the label element
                    textAlign: 'center', // Center-align the label text
                  }
                }}
              />
            </Box>
          </Box>

        </Box>
      </Box>
      {/* Visa Filters */}
      <Box
        id="visaFilters"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignContent: 'center',
          padding: '60px 40px 20px 50px', // Adjusted padding
          position: 'sticky',
          top: 5,
          left: 0,
          right: 0,
          gap: 2,
          width: 'calc(100% + 20px)', // Adjusted width
          marginLeft: '-30px', // Adjusted marginLeft
          backgroundColor: stickySearchBar ? '#fff' : 'transparent',
          zIndex: 1050,
        }}
      >
        {visaTypes.map(type => (
          <Chip
            key={type}
            label={type}
            onClick={() => handleVisaFilterChange(type)}
            variant={visaFilters.includes(type) ? 'filled' : 'outlined'}
            sx={{
              width: 160,
              height: 45,
              borderRadius: 4,
              backgroundColor: visaFilters.includes(type) ? '#605CD4' : 'white',
              color: visaFilters.includes(type) ? 'white' : 'black',
              boxShadow: stickySearchBar ? 'transparent' : '5px 7px 4px rgba(0, 0, 0, 0.2)',
              fontSize: 17,
              fontWeight: 500,
              '&:hover': {
                backgroundColor: visaFilters.includes(type) ? '#5044b8' : '#f0f0f0',
              }
            }}
          />
        ))}

        {/* Empty spacer to push Sort By chip to the right */}
        <div style={{ flex: 1 }} />

        {/* Sort By */}
        {!stickySearchBar && (
          <Chip
            label="Sort By"
            variant="outlined"
            sx={{
              width: 160,
              height: 45,
              borderRadius: 4,
              backgroundColor: 'white',
              color: 'black',
              boxShadow: stickySearchBar ? '0 2px 5px rgba(0,0,0,0.4)' : '5px 7px 4px rgba(0, 0, 0, 0.1)',
              fontSize: 17,
              fontWeight: 500,
              marginRight: 5,
              '&:hover': {
                backgroundColor: '#f0f0f0',
              }
            }}
          />
        )}
        {stickySearchBar && (
          <Box
            id="searchBar"
            sx={{
              position: 'absolute',
              top: '66%',
              right: '2%', // Adjusted to align with the right side
              transform: 'translateY(-50%)', // Changed to translateY for vertical centering
              zIndex: 1000,
              width: 380,
              height: 0,
              padding: '1px 19px 55px',
              backgroundColor: 'white',
              borderRadius: 5,
              marginRight: 5,
              boxShadow: stickySearchBar ? '0 2px 5px rgba(0,0,0,0.4)' : 'none',
              display: 'flex',
              alignItems: 'start',
              justifyContent: 'start',
              justifyItems: 'center',
              alignContent: 'center'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <TextField
                variant="standard"
                label="📍 India"
                disabled
                InputProps={{
                  disableUnderline: true
                }}
                InputLabelProps={{
                  style: { textAlign: 'center', color: 'black' }
                }}
                sx={{
                  width: 90,
                  height: 40,
                  backgroundColor: 'white',
                  borderRadius: 1,
                  '& .MuiInputLabel-root': {
                    textAlign: 'left',
                  }
                }}
              />
              <Autocomplete
                disablePortal
                options={countriesData.map(country => country.countryName)}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    label="✈️     Where to..."
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                  />
                }
                onInputChange={(event, newInputValue) => {
                  setSearchTerm(newInputValue);
                }}
                sx={{
                  width: 200,
                  height: 40,
                  backgroundColor: 'white',
                  borderRadius: 1,
                  '& .MuiInputLabel-root': {
                    textAlign: 'center',
                  }
                }}
              />
            </Box>
          </Box>
        )}
      </Box>



      <Grid container spacing={5} sx={{ p: 2 }}>
        {filteredCountries.map((country, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            < CountryCard key={country.slug} country={country}
              countryName={country.countryName}
              visaType={country.visaType}
              details={country.capital}
              imageUrl={country.imageUrl}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default App;