import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CountryBanner from './CountryBanner';
import VisaPricing from './VisaPricing';
import CountryTabs from './CountryTabs';
import About from './About';
import Process from './Process';
import Documents from './Documents';
import Box from '@mui/material/Box';
import FaqSection from './FaqSection';
import './CountryDetailPage.css';

const CountryDetailPage = () => {
    const { slug } = useParams();
    const [countryData, setCountryData] = useState({});
    const [faqs, setFaqs] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [aboutData, setAboutData] = useState([]);
    const [processInfo, setProcessInfo] = useState({});
    const [activeTab, setActiveTab] = useState('About');

    useEffect(() => {
        // Fetching for CountryBanner: demographic + visa info combined
        Promise.all([
            fetch(`/data/FinalDataCountry.json`).then(res => res.json()),
            fetch(`/data/combined_visa_info.json`).then(res => res.json())
        ]).then(([countriesData, visaInfoData]) => {
            const countryInfo = countriesData.find(country => country.slug === slug);
            const visaInfo = visaInfoData[slug];
            if (countryInfo && visaInfo) {
                const combinedData = { ...countryInfo, ...visaInfo };
                setCountryData(combinedData);
            } else {
                console.error('Country data or visa info is missing');
            }
        }).catch(error => console.error('Failed to load combined country and visa data', error));

        // Fetching FAQs data
        fetch(`/data/combined_faqs.json`)
            .then(response => response.json())
            .then(data => setFaqs(data[slug] || []))
            .catch(error => console.error('Failed to load FAQs', error));

        // Fetching documents data
        fetch(`/data/combined_documents.json`)
            .then(response => response.json())
            .then(data => setDocuments(data[slug] || []))
            .catch(error => console.error('Failed to load documents', error));

        // Fetching sections/process information
        fetch(`/data/combined_sections.json`)
            .then(response => response.json())
            .then(data => {
                // Assume the data for each country is stored under its slug as an array
                if (Array.isArray(data[slug])) {
                    setAboutData(data[slug]);
                } else {
                    console.error('Data is not an array', data[slug]);
                    setAboutData([]); // Set to empty array to avoid errors
                }
            })
            .catch(error => console.error('Failed to load about sections', error));
    }, [slug]);

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    height: 90,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0px 0px', // Adjusted padding for spacing
                    backgroundColor: isScrolled ? '#fff' : 'transparent', // Adjusted background color
                    position: 'fixed', // Changed to fixed positioning
                    top: 0,
                    justifyContent: 'space-between',
                    marginLeft: -5,
                    zIndex: 1200,
                }}
            >
                {/* Logo */}
                <div style={{ display: 'flex', gap: '9px', padding: '0px 0px 0px 72px', alignItems: 'end' }}>
                    <img src="/images/website/Saathi_img.png" alt="Twitter Cover" style={{ width: '28.24px', height: '46px' }} />
                    <div style={{ alignItems: 'baseline', display: 'flex', gap: '7px' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '36px', color: 'rgba(96, 92, 212, 212)', padding: '0px 0px' }}>Saathi</div>
                        <div style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)' }}>Visa</div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '35px', padding: '5px 60px 0px 0px' }}>
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

            <Box
                sx={{
                    
                    marginTop: '120px', // Adjusted margin top to make space for the header
                    marginLeft: '25px',// Add any other styling you need
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {countryData ? (
                        <>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'start', justifyContent: 'flex-start' }}>
                                <CountryBanner data={countryData} />
                                <div style={{ marginLeft: '65px' }}> {/* Adjust margin as needed */}
                                    <VisaPricing data={countryData} />
                                </div>
                            </div>
                            <div style={{
                                marginTop: '-905px',
                                width: '57%',
                                height: '95px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',      
                                position: 'relative',
                                border: '2px solid rgba(96, 92, 212, 255)',
                                borderRadius: 4,
                                paddingLeft: '30px',  // Add left padding
                                paddingRight: '30px', // Add right padding
                                paddingTop: '5px',
                                paddingBottom: '5px',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.35)', // Box shadow
                            }}>
                                <div style={{ textAlign: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
                                    <img src="/images/website/Apply.png" alt="Image 1" style={{ width: '55px', height: '38px' }} />
                                    <p style={{ fontWeight: 'bold', margin: '3px', fontSize: '14px' }}>Applicant</p>
                                    <p style={{ margin: '0.5px', fontSize: '14px' }}>Required</p>
                                </div>
                                <div style={{ textAlign: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                                    <img src="/images/website/Max.png" alt="Image 1" style={{ width: '55px', height: '38px' }} />
                                    <p style={{ fontWeight: 'bold', margin: '3px', fontSize: '14px' }}>Max Stay</p>
                                    <p style={{ margin: '0.5px', fontSize: '14px' }}>60 days/ 30 days</p>
                                </div>
                                <div style={{ textAlign: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                                    <img src="/images/website/Process.png" alt="Image 1" style={{ width: '50px', height: '38px' }} />
                                    <p style={{ fontWeight: 'bold', margin: '3px', fontSize: '14px' }}>Processing Time</p>
                                    <p style={{ margin: '0.5px', fontSize: '14px' }}>~2 hrs</p>
                                </div>
                                <div style={{ textAlign: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', marginRight: '20px' }}>
                                    <img src="/images/website/Stay.png" alt="Image 1" style={{ width: '55px', height: '38px' }} />
                                    <p style={{ fontWeight: 'bold', margin: '3px', fontSize: '14px' }}>Stay</p>
                                    <p style={{ margin: '0.5px', fontSize: '14px' }}>Short term</p>
                                </div>
                            </div>


                            <CountryTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                            {activeTab === 'About' && <About data={aboutData} />}
                            {activeTab === 'Process' && <Process data={processInfo} />}
                            {activeTab === 'Documents' && <Documents data={documents} />}
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>


            </Box>
        </>

    );
};

export default CountryDetailPage;