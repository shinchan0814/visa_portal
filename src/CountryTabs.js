import './styles.css'; // or import './styles.scss';
import React, { useState, useEffect } from 'react';

const CountryTabs = ({ activeTab, setActiveTab }) => {
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
        <div
            style={{
                marginTop: '30px',
                width: isMobile ?'100%': '60%',
                display: 'flex',
                justifyContent: 'space-between',
                marginRight: isMobile ? '-10px' : '',
                position: 'relative',
                marginBottom: '10px'
            }}>
            <button
                style={{
                    marginLeft: isMobile ? '0px' : '90px',
                    border: 'none', fontSize: '18px',
                    color: activeTab === 'About' ? 'blue' : 'grey',
                    background: 'transparent'
                }}
                onClick={() => setActiveTab('About')}>
                <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: isMobile ? '18px' :  20, fontWeight: 'bold' }}>About</span>
            </button>
            <button style={{ border: 'none', fontSize: isMobile ? '15px' : '18px', color: activeTab === 'Process' ? 'blue' : 'grey', background: 'transparent' }} onClick={() => setActiveTab('Process')}>
                <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize:isMobile ? '18px' : 20, fontWeight: 'bold' }}>Process</span>
            </button>
            <button style={{ marginRight: isMobile ? '0px' : '80px', border: 'none', fontSize: '18px', color: activeTab === 'Documents' ? 'blue' : 'grey', background: 'transparent' }} onClick={() => setActiveTab('Documents')}>
                <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize:isMobile ? '18px' : 20, fontWeight: 'bold' }}>Documents</span>
            </button>
            <div
                style={{
                    position: 'absolute',
                    top: 'calc(100% + 15px)', // position below buttons with some space
                    left: isMobile ? '0px' : '30px', // margin from left
                    right: isMobile ? '0px' :'15px', // margin from right
                    height: '1.5px',
                    background: 'black',
                }}
            ></div>
        </div>
    );
};

export default CountryTabs;
