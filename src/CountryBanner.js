import React, { useState, useEffect } from 'react';
import './CountryBanner.css'; // Make sure to create and link a CSS file for styling

const CountryBanner = ({ data }) => {

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
    if (!data) {
        return <p>Loading...</p>; // Or any other placeholder content
    }

    // Utility function to add days to current date and format it
    const calculateVisaDate = (days) => {
        const now = new Date();
        // Ensure 'days' is treated as a number
        now.setDate(now.getDate() + parseInt(days));

        const day = now.getDate();
        const month = now.toLocaleString('default', { month: 'long' });

        // Function to get the day suffix
        const getDaySuffix = (day) => {
            if (day > 3 && day < 21) return 'th';
            switch (day % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd";
                default: return "th";
            }
        };

        return `${day}${getDaySuffix(day)} ${month}`;
    };

    return (
        <div className="country-banner" style={{
            width: isMobile ? '87%' : '',
            backgroundImage: `url(${data.imageUrl})`,
            position: 'relative',
            minHeight: '200px',
            backgroundSize: 'cover', /* Set background size to contain */
            backgroundPosition: '20% 20%', /* Optional: Adjust background position */
            backgroundRepeat: 'no-repeat', /* Optional: Prevent background image from repeating */
        }}>
            {/* Gradient overlay */}
            {isMobile && (
                <div
                    className="gradient-overlay"
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '50%', // Adjust the height of the gradient overlay as needed
                        background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))',
                    }}
                />
            )}
            <div className="country-info">
                <h1 style={{ color: 'white', fontSize: isMobile ? '20px' : '30px', textShadow: '0 0 8px black', fontFamily: 'Nunito Sans, sans-serif' }}>{data.countryName}</h1>
                <div className="black-overlay"
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '80px',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        backdropFilter: 'blur(3px)',
                        background: isMobile
                        ? 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))'
                        : 'rgba(0, 0, 0, 0.7)',
                    }}>
                    <p style={{ display: 'flex', justifyContent: 'space-between', margin: isMobile ? '5px 10px' : '5px 30px' }}>
                        <span style={{ fontSize: isMobile ? '12px' : '' }}>
                            <img src="/images/website/People.png" width="13" height="13" alt="Users Icon" />
                            <i className="fas fa-users" style={{ marginLeft: '5px', fontFamily: 'Nunito Sans, sans-serif' }}></i> {data.population}
                        </span>
                        <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight: isMobile ? '-8px' : '0px' }}>
                            <img src="/images/website/Currency.png" width="13" height="13" alt="Users Icon" />
                            <i className="fas fa-clock" style={{ marginLeft: '0px', marginRight: '10px' }}></i>
                            <span style={{ textAlign: 'left', fontFamily: 'Nunito Sans, sans-serif', fontSize: isMobile ? '11px' : '' }}>{data.Currency}, {data.CurrencyRate}</span>
                        </span>

                    </p>
                    <p style={{ display: 'flex', justifyContent: 'space-between', margin: isMobile ? '9px 10px' : '9px 30px' }}>
                        <span style={{ fontSize: isMobile ? '12px' : '' }}>
                            <img src="/images/website/Diff.png" width="13" height="13" alt="Users Icon" />
                            <i className="fas fa-euro-sign" style={{ marginLeft: '5px', fontFamily: 'Nunito Sans, sans-serif' }}></i> {data.timeDifference}
                        </span>
                        <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight: '0px' }}>
                            <img src="/images/website/Status.png" width="13" height="13" alt="Users Icon" />
                            <i className="fas fa-clock" style={{ marginLeft: '5px', marginRight: '5px' }}></i>
                            <span style={{ textAlign: 'left', fontFamily: 'Nunito Sans, sans-serif', fontSize: isMobile ? '12px' : '' }}>{data.developmentStatus}</span>
                        </span>
                    </p>
                </div>

            </div>
            <div className="visa-timeline" style={{
                backgroundColor: 'rgba(40, 160, 107, 255)',
                color: 'white',
                padding: '10px',
                width: isMobile ? 150 : 253,
                height: 30,
                display: 'flex',
                justifyContent: 'space-between',
                marginRight: 10,
                marginTop: 10,
                alignItems: 'center'
            }}>
                <div className="visa-timeline-inner" style={{ display: 'flex', alignItems: 'center', width: '253px', height: '53px' }}>
                    <img src="/images/website/clock.png" alt="Twitter Cover" style={{ width: '28.24px', height: '28.24px', marginRight: isMobile ? 5 : 20, }} />
                    <div className="visa-timeline-text" style={{ display: 'flex', flexDirection: 'column', flex: 0.8, alignItems: 'start' }}>
                        <p style={{ margin: 0, fontWeight: 'bold', marginBottom: '5px', whiteSpace: 'nowrap', fontFamily: 'Nunito Sans, sans-serif', fontSize: isMobile ? '10px' : '' }}>Get your visa by {calculateVisaDate(data.visaTimeline)},</p>
                        <p style={{ margin: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: isMobile ? '10px' : '' }}>if you apply today</p>
                    </div>
                </div>

            </div>
        </div>


    );
};

export default CountryBanner;
