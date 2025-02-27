import React from 'react';
import { Card, CardContent, Typography, Button, Box, Grid } from '@mui/material';
import  { useRouter}  from 'next/router';
import Link from 'next/link';
import { Language } from '@mui/icons-material';
//import '../styles/styles.module.css'; // or import './styles.scss';
import * as fbq from "../lib/fpixel";

const visaTypeColors = {
  'E-visa': 'lightgreen',
  'Visa on Arrival': 'green',
  'Visa Free': 'lightblue',
  'Visa Required': 'yellow',
};

const CountryCard = ({ country, countryName, slug, visaType, imageUrl, Safety, capital, Currency, languages, flightPrice }) => {
  const router = useRouter();

  const handleNavigate = () => {
    // Use the router instance from above
    router.replace(`/country/${country.slug}`);
  };
  const handleCountryClick = (countrySlug) => {
    // Fire Meta Pixel event
    fbq.event('CountryCardClick', { country_slug: countrySlug });
    window.dataLayer.push({ event:'CountryCardClick', country_slug: countrySlug });
    
  
    // Optional: Debug in console
    console.log('Country Clicked:', countrySlug);
  };



  return (
    <Card sx={{
      width: ['100%','88%'],
      height: 310,
      mx: [0,1], // Increased horizontal margin for better distribution
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
            fontFamily: 'Nunito Sans, sans-serif',
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
                <Typography variant="body2" color="text.secondary" sx={{
                  marginBottom: 'auto',
                  color: 'black',
                  fontSize: 12,
                  fontWeight: 'bold',
                  fontFamily: 'Nunito Sans, sans-serif',
                  whiteSpace: 'nowrap', // Prevent text from wrapping
                  overflow: 'hidden', // Hide overflowing text
                  textOverflow: 'ellipsis', // Display ellipsis (...) for truncated text
                  '@media (max-width: 600px)': { // Adjust the width based on your mobile breakpoint
                    maxWidth: '5em', // Set max width to 4 characters on mobile
                  },
                }}>
                  Get visa in {country.visaTimeline} days
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
                <Typography variant="body2" color="text.secondary" sx={{
                  marginBottom: 'auto',
                  color: 'black',
                  fontSize: 12,
                  fontFamily: 'Nunito Sans, sans-serif',
                  whiteSpace: 'nowrap', // Prevent text from wrapping
                  overflow: 'hidden', // Hide overflowing text
                  textOverflow: 'ellipsis', // Display ellipsis (...) for truncated text
                  '@media (max-width: 600px)': { // Adjust the width based on your mobile breakpoint
                    maxWidth: '4em', // Set max width to 4 characters on mobile
                  },
                }}>
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
                <Typography variant="body2" color="text.secondary" sx={{
                  marginBottom: 'auto',
                  color: 'black',
                  fontSize: 12,
                  fontFamily: 'Nunito Sans, sans-serif',
                  whiteSpace: 'nowrap', // Prevent text from wrapping
                  overflow: 'hidden', // Hide overflowing text
                  textOverflow: 'ellipsis', // Display ellipsis (...) for truncated text
                  '@media (max-width: 600px)': { // Adjust the width based on your mobile breakpoint
                    maxWidth: '6em', // Set max width to 6 characters on mobile
                  },
                }}>
                  Flights from ₹{Math.round(Number(country.flightPrice.replace(/[^0-9.-]+/g, ""))).toLocaleString()}
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
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 'auto', color: 'black', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontSize: 12, fontFamily: 'Nunito Sans, sans-serif' }}>
                  {country.languages.split(' ').slice(0, 1).join(' ')}{country.languages.split(' ').length > 1 ? '...' : ''}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Link href={`/country/${country.slug}`} passHref>
          <Button component="a" variant="contained" 
          onClick={() => handleCountryClick(country.slug)} 
            sx={{ borderRadius: 4, width: 145, height: 35, marginTop: '16px', textTransform: 'none', fontSize: 18, backgroundColor: 'rgb(92,92,212, 0.70)' }}>
            <span style={{ color: 'white', fontFamily: 'Nunito Sans, sans-serif' }}>Let's go</span>
          </Button>
        </Link>

        {/* <Button onClick={handleNavigate} variant="contained"
          sx={{ borderRadius: 4, width: 145, height: 35, marginTop: '16px', textTransform: 'none', fontSize: 18, backgroundColor: 'rgb(92,92,212, 0.70)' }}>
          <span style={{ color: 'white', fontFamily: 'Nunito Sans, sans-serif' }}>Let's go</span>
        </Button> */}
      </CardContent>
    </Card>
  );
};

export default CountryCard;
