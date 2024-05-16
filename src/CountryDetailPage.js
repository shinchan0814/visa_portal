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
import './styles.css'; // or import './styles.scss';

const CountryDetailPage = () => {
    const { slug } = useParams();
    const [countryData, setCountryData] = useState({});
    const [faqs, setFaqs] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [aboutData, setAboutData] = useState([]);
    const [processInfo, setProcessInfo] = useState([]);
    const [activeTab, setActiveTab] = useState('Process');
    const [docrequired, setDocRequired] = useState([]);
    const [showMenu, setShowMenu] = useState(false);

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

        fetch(`/data/All_Documents_Required.json`)
            .then(response => response.json())
            .then(data => setProcessInfo(data[slug] || []))
            .catch(error => console.error('Failed to required docs', error))

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
        window.scrollTo(0, 0);
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

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <>
                {/* Mobile Header with Hamburger Menu */}
                <Box
                    sx={{
                        width: '90%',
                        height: 50,
                        display: { xs: 'flex', sm: 'none' }, // Show flex display on small screens, hide on larger screens
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '3px 35px', // Adjusted padding for spacing
                        backgroundColor: '#fff', // Adjusted background color
                        position: 'fixed', // Changed to fixed positioning
                        marginLeft: '-30px',
                        top: 0,
                        zIndex: 1200,
                    }}
                >
                    {/* Logo */}
                    <div style={{ display: 'flex', gap: '9px', alignItems: 'center', marginLeft: "-15px" }}>
                        <img src="/images/website/Saathi_img.png" alt="Logo" style={{ width: '28.24px', height: '46px', justifyContent: 'center' }} />
                        <div style={{ alignItems: 'baseline', display: 'flex', gap: '7px' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '36px', color: 'rgba(96, 92, 212, 212)', padding: '0px 0px', fontFamily: 'Nunito Sans, sans-serif' }}>Saathi</div>
                            <div style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)', fontFamily: 'Nunito Sans, sans-serif' }}>Visa</div>
                        </div>
                    </div>

                    {/* Hamburger Icon and Menu for Mobile */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', justifyContent: 'right' }}>
                        {/* Hamburger Icon */}
                        <div style={{ cursor: 'pointer', paddingRight: '20px' }} onClick={() => setShowMenu(!showMenu)}>
                            &#9776;
                        </div>

                        {/* Mobile Menu */}
                        {showMenu && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '15px 0', backgroundColor: '#fff', position: 'absolute', top: 50, left: 0, width: '100%', zIndex: 1100 }}>
                                {/* Text section 1 */}
                                <div>
                                    <a href="https://visa.saathi.app/" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)', fontFamily: 'Nunito Sans, sans-serif', textDecoration: 'none', paddingLeft: '20px' }}>Get Visa</a>
                                </div>

                                {/* Text section 2 */}
                                <div>
                                    <a href="https://play.google.com/store/apps/details?id=app.saathi.android&pli=1" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)', fontFamily: 'Nunito Sans, sans-serif', textDecoration: 'none', paddingLeft: '20px' }}>Saathi App</a>
                                </div>

                                {/* Text section 3 */}
                                <div>
                                    <a href="https://docs.google.com/forms/d/e/1FAIpQLScWUyqSZidaqJiO1bt9wj4rJSxLM8U0NicYX55y3R6MslWaNQ/viewform" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)', fontFamily: 'Nunito Sans, sans-serif', textDecoration: 'none', paddingLeft: '20px' }}>Partners</a>
                                </div>

                                {/* Text section 4 */}
                                <div>
                                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSey8QQWD7lXE44MYamKU0my7aIuElO3lpvlZnKH5Ir6NFweow/viewform" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)', fontFamily: 'Nunito Sans, sans-serif', textDecoration: 'none', paddingLeft: '20px' }}>Creators</a>
                                </div>

                                {/* Text section 5 */}
                                <div>
                                    <a href="https://blog.saathi.app/" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)', fontFamily: 'Nunito Sans, sans-serif', textDecoration: 'none', paddingLeft: '20px' }}>Blog</a>
                                </div>
                            </div>
                        )}
                    </div>
                </Box>

                {/* Desktop Header */}
                <Box
                    sx={{
                        width: '100%',
                        height: 90,
                        display: { xs: 'none', sm: 'flex' }, // Show flex display on larger screens, hide on small screens
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
                    <div style={{ display: 'flex', gap: '9px', padding: '0px 0px 0px 72px', alignItems: 'center' }}>
                        <img src="/images/website/Saathi_img.png" alt="Twitter Cover" style={{ width: '28.24px', height: '46px' }} />
                        <div style={{ alignItems: 'baseline', display: 'flex', gap: '7px' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '36px', color: 'rgba(96, 92, 212, 212)', fontFamily: 'Nunito Sans, sans-serif' }}>Saathi</div>
                            <div style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)', fontFamily: 'Nunito Sans, sans-serif' }}>Visa</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '35px', padding: '5px 60px 0px 0px' }}>
                        {/* Text section 1 */}
                        <div>
                            <a href="https://visa.saathi.app/" target="_blank" rel="noopener noreferrer"
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '18px',
                                    color: 'rgba(96, 92, 212, 212)',
                                    fontFamily: 'Nunito Sans, sans-serif',
                                    textDecoration: 'none'
                                }}>
                                Get Visa
                            </a>
                        </div>

                        {/* Text section 2 */}
                        <div>
                            <a href="https://play.google.com/store/apps/details?id=app.saathi.android&pli=1" target="_blank" rel="noopener noreferrer"
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '18px',
                                    color: 'rgba(96, 92, 212, 212)',
                                    fontFamily: 'Nunito Sans, sans-serif',
                                    textDecoration: 'none'
                                }}>
                                Saathi App
                            </a>
                        </div>
                        {/* Text section 3 */}
                        <div>
                            <a href="https://docs.google.com/forms/d/e/1FAIpQLScWUyqSZidaqJiO1bt9wj4rJSxLM8U0NicYX55y3R6MslWaNQ/viewform" target="_blank" rel="noopener noreferrer"
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '18px',
                                    color: 'rgba(96, 92, 212, 212)',
                                    fontFamily: 'Nunito Sans, sans-serif',
                                    textDecoration: 'none'
                                }}>
                                Partners
                            </a>
                        </div>
                        {/* Text section 4 */}
                        <div>
                            <a href="https://docs.google.com/forms/d/e/1FAIpQLSey8QQWD7lXE44MYamKU0my7aIuElO3lpvlZnKH5Ir6NFweow/viewform" target="_blank" rel="noopener noreferrer"
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '18px',
                                    color: 'rgba(96, 92, 212, 212)',
                                    fontFamily: 'Nunito Sans, sans-serif',
                                    textDecoration: 'none'
                                }}>
                                Creators
                            </a>
                        </div>
                        {/* Text section 5 */}
                        <div>
                            <a href="https://blog.saathi.app/" target="_blank" rel="noopener noreferrer"
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '18px',
                                    color: 'rgba(96, 92, 212, 212)',
                                    fontFamily: 'Nunito Sans, sans-serif',
                                    textDecoration: 'none'
                                }}>
                                Blog
                            </a>
                        </div>
                    </div>
                </Box>
            </>

            <Box
                sx={{
                    marginTop: isMobile ? '80px' : '120px', // Adjusted margin top to make space for the header
                    marginLeft: isMobile ? '-15px' : '40px',// Add any other styling you need
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {countryData ? (
                        <>
                            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'start', justifyContent: 'flex-start' }}>
                                <CountryBanner data={countryData} />
                                <div style={{ marginLeft: isMobile ? '' : '65px' }}> {/* Adjust margin as needed */}
                                    <VisaPricing data={countryData} />
                                </div>
                            </div>
                            <div style={{
                                marginTop: isMobile ? '15px' : '-905px',
                                width: isMobile ? '85%' : '57%',
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
                                <div style={{ textAlign: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', marginLeft: isMobile ? '-10px' : '20px' }}>
                                    <img src="/images/website/Require.png" alt="Image 1" style={{ width: isMobile ? '32px' : '42px', height: isMobile ? '28px' : '38px' }} />
                                    <p style={{ fontWeight: 'bold', margin: '3px', fontSize: isMobile ? '10px' : '14px', fontFamily: 'Nunito Sans, sans-serif' }}>Applicant</p>
                                    <p style={{ margin: '0.5px', fontSize: isMobile ? '10px' : '14px', fontFamily: 'Nunito Sans, sans-serif' }}>{countryData.Applicant}</p>
                                </div>
                                <div style={{ textAlign: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                                    <img src="/images/website/Stand.png" alt="Image 1" style={{ width: isMobile ? '32px' : '42px', height: isMobile ? '28px' : '38px' }} />
                                    <p style={{ fontWeight: 'bold', margin: '3px', fontSize: isMobile ? '10px' : '14px', fontFamily: 'Nunito Sans, sans-serif' }}>Max Stay</p>
                                    <p style={{ margin: '0.5px', fontSize: isMobile ? '10px' : '14px', fontFamily: 'Nunito Sans, sans-serif' }}>{countryData['Max stay']}</p>
                                </div>
                                <div style={{ textAlign: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                                    <img src="/images/website/Hours.png" alt="Image 1" style={{ width: isMobile ? '32px' : '42px', height: isMobile ? '28px' : '38px' }} />
                                    <p style={{ fontWeight: 'bold', margin: '3px', fontSize: isMobile ? '10px' : '14px', fontFamily: 'Nunito Sans, sans-serif' }}>Processing Time</p>
                                    <p style={{ margin: '0.5px', fontSize: isMobile ? '10px' : '14px', fontFamily: 'Nunito Sans, sans-serif' }}>{countryData['Processing time']}</p>
                                </div>
                                <div style={{ textAlign: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', marginRight: isMobile ? '-10px' : '20px' }}>
                                    <img src="/images/website/Term.png" alt="Image 1" style={{ width: isMobile ? '32px' : '42px', height: isMobile ? '28px' : '38px' }} />
                                    <p style={{ fontWeight: 'bold', margin: '3px', fontSize: isMobile ? '10px' : '14px', fontFamily: 'Nunito Sans, sans-serif' }}>Stay</p>
                                    <p style={{ margin: '0.5px', fontSize: isMobile ? '10px' : '14px', fontFamily: 'Nunito Sans, sans-serif' }}>{countryData['Stay']}</p>
                                </div>
                            </div>


                            <CountryTabs activeTab={activeTab} setActiveTab={setActiveTab} style={{ marginRight: isMobile ? '-10px' : '' }} />
                            {activeTab === 'About' && <About data={aboutData} />}
                            {activeTab === 'Process' && (
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginLeft: isMobile ? '-30px' : '-530px', // Adjust the value as needed
                                    transition: 'margin-left 0.3s ease' // Optional: add transition for smooth animation
                                }}>
                                    <Documents data={documents} />
                                </div>
                            )}

                            {activeTab === 'Documents' && <Process data={processInfo} />}

                            {isMobile && (
                                <FaqSection data={faqs} />
                            )}
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
