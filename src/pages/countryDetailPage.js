import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import CountryBanner from '../components/countryBanner';
import VisaPricing from '../components/visaPricing';
import CountryTabs from '../components/countryTabs';
import About from '../pages/about';
import Process from '../components/process';
import Documents from '../components/documents';
import Box from '@mui/material/Box';
import FaqSection from '../components/faqSection';
import Head from 'next/head';
//import '../styles/CountryDetailPage.module.css';
//import '../styles/styles.module.css'; // or import './styles.scss';


const CountryDetailPage = () => {
    const router = useRouter();
    const params = useParams();
    const slug = params?.slug;
    const [countryData, setCountryData] = useState({});
    const [faqs, setFaqs] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [aboutData, setAboutData] = useState([]);
    const [processInfo, setProcessInfo] = useState([]);
    const [activeTab, setActiveTab] = useState('Process');
    const [docrequired, setDocRequired] = useState([]);
    const [showMenu, setShowMenu] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug) {
            setError('No country specified');
            setIsLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const [countriesResponse, visaInfoResponse, faqsResponse, documentsResponse, sectionsResponse, processInfoResponse] = await Promise.all([
                    fetch('/data/FinalDataCountry.json'),
                    fetch('/data/combined_visa_info.json'),
                    fetch('/data/combined_faqs.json'),
                    fetch('/data/combined_documents.json'),
                    fetch('/data/combined_sections.json'),
                    fetch('/data/All_Documents_Required.json')
                ]);

                const [countriesData, visaInfoData, faqsData, documentsData, sectionsData, processInfoData] = await Promise.all([
                    countriesResponse.json(),
                    visaInfoResponse.json(),
                    faqsResponse.json(),
                    documentsResponse.json(),
                    sectionsResponse.json(),
                    processInfoResponse.json()
                ]);

                const countryInfo = countriesData.find(country => country.slug === slug);
                const visaInfo = visaInfoData[slug];

                if (countryInfo && visaInfo) {
                    setCountryData({ ...countryInfo, ...visaInfo });
                } else {
                    setError('Country data or visa info is missing');
                }

                setFaqs(faqsData[slug] || []);
                setDocuments(documentsData[slug] || []);
                setAboutData(Array.isArray(sectionsData[slug]) ? sectionsData[slug] : []);
                setProcessInfo(processInfoData[slug] || []);
            } catch (error) {
                console.error('Failed to load data', error);
                setError('Failed to load data. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
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

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!countryData) return <p>No data available for this country.</p>;

    return (
        <>
            <Head>
                <title>{`Visa by saathi.app - Get visa for ${countryData.countryName}`}</title>
                <meta name="description" content="Saathi.app provides you the visa for more than 100+ countries in the world. With your Indian passport, travel to any country has become easier" />
                <meta name="keywords" content={`travel, ${countryData.countryName}, ${countryData.visaType}, ${countryData.Price}, ${countryData.capital}, ${countryData.Currency}, ${countryData.languages}, ${countryData.weather}, ${countryData.visaTimeline}`} />
            </Head>
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
                        backgroundColor: isScrolled ? '#fff' : 'transparent', // Adjusted background color
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
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '15px 0', backgroundColor: isScrolled ? '#fff' : '#f7f7f7', position: 'absolute', top: 50, left: 0, width: '100%', zIndex: 1100 }}>
                                {/* Text section 1 */}
                                <div>
                                    <a href="https://saathi.app/about-us" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)', fontFamily: 'Nunito Sans, sans-serif', textDecoration: 'none' }}>About</a>
                                </div>
                                <div>
                                    <a href="https://visa.saathi.app/" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)', fontFamily: 'Nunito Sans, sans-serif', textDecoration: 'none' }}>Get Visa</a>
                                </div>

                                {/* Text section 2 */}
                                <div>
                                    <a href="https://saathiapp.onelink.me/I342/t4ek7oi9" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)', fontFamily: 'Nunito Sans, sans-serif', textDecoration: 'none' }}>Download App</a>
                                </div>
                                <div>
                                    <a href="https://blog.saathi.app/" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)', fontFamily: 'Nunito Sans, sans-serif', textDecoration: 'none' }}>Blog</a>
                                </div>
                                {/* Text section 3 */}

                                <div>
                                    <a href="https://docs.google.com/forms/d/e/1FAIpQLScWUyqSZidaqJiO1bt9wj4rJSxLM8U0NicYX55y3R6MslWaNQ/viewform" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)', fontFamily: 'Nunito Sans, sans-serif', textDecoration: 'none' }}>Partners</a>
                                </div>
                                {/* Text section 4 */}
                                <div>
                                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSey8QQWD7lXE44MYamKU0my7aIuElO3lpvlZnKH5Ir6NFweow/viewform" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(96, 92, 212, 212)', fontFamily: 'Nunito Sans, sans-serif', textDecoration: 'none' }}>Creators</a>
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
                            <a href="https://saathi.app/about-us" target="_blank" rel="noopener noreferrer"
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '18px',
                                    color: 'rgba(96, 92, 212, 212)',
                                    fontFamily: 'Nunito Sans, sans-serif',
                                    textDecoration: 'none'
                                }}>
                                About
                            </a>
                        </div>
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
                            <a href="https://saathiapp.onelink.me/I342/t4ek7oi9" target="_blank" rel="noopener noreferrer"
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
                                    <p style={{ margin: '0.5px', fontSize: isMobile ? '10px' : '14px', fontFamily: 'Nunito Sans, sans-serif' }}>{countryData.Applicant ?? 'Required'}</p>
                                </div>
                                <div style={{ textAlign: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                                    <img src="/images/website/Stand.png" alt="Image 1" style={{ width: isMobile ? '32px' : '42px', height: isMobile ? '28px' : '38px' }} />
                                    <p style={{ fontWeight: 'bold', margin: '3px', fontSize: isMobile ? '10px' : '14px', fontFamily: 'Nunito Sans, sans-serif' }}>Max Stay</p>
                                    <p style={{ margin: '0.5px', fontSize: isMobile ? '10px' : '14px', fontFamily: 'Nunito Sans, sans-serif' }}>{countryData['Max stay'] ?? 'Varies'}</p>
                                </div>
                                <div style={{ textAlign: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                                    <img src="/images/website/Hours.png" alt="Image 1" style={{ width: isMobile ? '32px' : '42px', height: isMobile ? '28px' : '38px' }} />
                                    <p style={{ fontWeight: 'bold', margin: '3px', fontSize: isMobile ? '10px' : '14px', fontFamily: 'Nunito Sans, sans-serif' }}>Processing Time</p>
                                    <p style={{ margin: '0.5px', fontSize: isMobile ? '10px' : '14px', fontFamily: 'Nunito Sans, sans-serif' }}>{countryData['Processing time'] ?? 'Varies'}</p>
                                </div>
                                <div style={{ textAlign: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', marginRight: isMobile ? '-10px' : '20px' }}>
                                    <img src="/images/website/Term.png" alt="Image 1" style={{ width: isMobile ? '32px' : '42px', height: isMobile ? '28px' : '38px' }} />
                                    <p style={{ fontWeight: 'bold', margin: '3px', fontSize: isMobile ? '10px' : '14px', fontFamily: 'Nunito Sans, sans-serif' }}>Stay</p>
                                    <p style={{ margin: '0.5px', fontSize: isMobile ? '10px' : '14px', fontFamily: 'Nunito Sans, sans-serif' }}>{countryData['Stay'] ?? 'Varies'}</p>
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
