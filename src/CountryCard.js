import React from 'react';
import { Card, CardContent, Typography, Button, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Language } from '@mui/icons-material';
import './styles.css'; // or import './styles.scss';


const visaTypeColors = {
  'E-visa': 'lightgreen',
  'Visa on Arrival': 'green',
  'Visa Free': 'lightblue',
  'Visa Required': 'yellow',
};

const CountryCard = ({ country, countryName, slug, visaType, imageUrl, Safety, capital, Currency, languages, flightPrice }) => {
  const navigate = useNavigate();

  // Function to handle button click
  const handleNavigate = () => {
    navigate(`/country/${country.slug}`); // Navigate using the country slug
  };
  return (
    <Card sx={{
      width: '88%',
      height: 310,
      mx: 1, // Increased horizontal margin for better distribution
      my: -0.25,
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 7px 40px rgba(0, 0, 0, 0.25)',
      borderRadius: '15px',
      overflow: 'hidden',
    }}>
      {/* Image section with overlay */}
      <Box sx={{
        height: '50%',
        position: 'relative',
        display: 'flex',
      }}>
        <Box component="img" src={imageUrl} alt={countryName} sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'brightness(40%)' // Darkened for text visibility
        }} />
        <Box sx={{
          position: 'absolute',
          bottom: 8, // Adjust bottom position for better visibility
          left: 0,
          right: 8,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center', // Align items vertically
          width: '90%',
          px: 2 // Horizontal padding inside the overlay
        }}>
          <Typography sx={{
            color: 'White',
            textShadow: '1px 1px black', // Black stroke via shadow for visibility
            fontWeight: 'bold',
            padding: '4px 2px',
            fontFamily: 'Nunito Sans, sans-serif' ,
            fontSize: '28px',
          }}>
            {countryName}
          </Typography>
          <Typography sx={{
            // backgroundColor: visaTypeColors[visaType],
            backgroundColor: '#F0566F',
            maxWidth: '91px',
            maxHeight: '22px',
            borderRadius: '15px', // Pill shape
            padding: '5px 10px',
            marginBottom: '0px',
            justifyItems: 'center',
            fontSize: 15,
            fontWeight: 'bold',
            color: 'white',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            fontFamily: 'Nunito Sans, sans-serif' 
          }}>
            {visaType}
          </Typography>
        </Box>

      </Box>
      {/* Details section */}
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px' }}>
        <Grid container spacing={0.5} sx={{ marginBottom: 'auto' }}>
          <Grid item xs={6}>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <img src="images/website/Thunder.png" alt="Safety Icon" style={{ width: 20, height: 21 }} />
              </Grid>
              <Grid item>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 'auto', color: 'black', fontSize: 12, fontWeight: 'bold' ,fontFamily: 'Nunito Sans, sans-serif' }}>
                  {country.Currency}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={0.5} alignItems="center" justifyContent='right' padding='0px 8px'>
              <Grid item>
                <img src="images/website/Mod.png" alt="Currency Icon" style={{ width: 18.81, height: 19.86 }} />
              </Grid>
              <Grid item>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 'auto', color: 'black' , fontSize: 12, fontFamily: 'Nunito Sans, sans-serif' }}>
                  {country.Safety}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={0.5} alignItems="center">
              <Grid item>
                <img src="images/website/Plane.png" alt="Language Icon" style={{ width: 23.88, height: 23.83 }} />
              </Grid>
              <Grid item>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 'auto', color: 'black', fontSize: 12 , fontFamily: 'Nunito Sans, sans-serif' }}>
                  {country.flightPrice}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={0.5} alignItems='center' justifyContent='right' padding='0px 8px'>
              <Grid item>
                <img src="images/website/Lang.png" alt="Flight Price Icon" style={{ width: 22.74, height: 20.17 }} />
              </Grid>
              <Grid item>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 'auto', color: 'black', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' , fontSize: 12, fontFamily: 'Nunito Sans, sans-serif' }}>
                  {country.languages.split(' ').slice(0, 1).join(' ')}{country.languages.split(' ').length > 1? '...' : ''}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Button onClick={handleNavigate} variant="contained"
          sx={{ borderRadius: 4, width: 145, height: 35, marginTop: '16px', textTransform: 'none', fontSize: 18, color: 'rgba(96,92,212,212)' }}>
          <span style={{ color: 'white', fontFamily: 'Nunito Sans, sans-serif'  }}>Let's go</span>
        </Button>
      </CardContent>

    </Card>
  );
};

export default CountryCard;
