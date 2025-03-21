import React, { useState, useEffect } from 'react';
import FaqSection from '../components/faqSection';
import { useParams } from 'next/navigation';
import Modal from '../components/modal';
import * as fbq from "../lib/fpixel";
const VisaPricing = ({ data }) => {
    const { slug } = useParams();
    const [faqs, setFaqs] = useState([]);
    const [count, setCount] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [countryName, setCountryName] = useState('');

    useEffect(() => {
        fetch(`/data/FinalDataCountry.json`)
            .then(response => response.json())
            .then(data => {
                const country = data[slug];
                setCountryName(country ? country.name : ''); // Ensure 'name' exists
            })
            .catch(error => console.error('Failed to load country data', error));
    }, [slug]);


    const handleBookSlotClick = () => {
        // Get the current URL path and split it by "/"
        const pathParts = window.location.pathname.split("/");
        
        // Get the last non-empty part of the path as the country slug
        const countrySlug = pathParts.filter(Boolean).pop();
        
        console.log(countrySlug);
    
        // Fire the Facebook event
        fbq.event('BookSlotForFree', { country: countrySlug });
    
        // Push event to Google Tag Manager
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: "book_slot_click",
            country_slug: countrySlug
        });
    
        // Show the modal
        setShowModal(true);
    };
    
    

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const decrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const increment = () => {
        setCount(count + 1);
    };

    useEffect(() => {
        fetch(`/data/combined_faqs.json`)
            .then(response => response.json())
            .then(data => setFaqs(data[slug] || []))
            .catch(error => console.error('Failed to load FAQs', error));
    }, [slug]);

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

    const isIOS = () => {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    };

    const isAndroid = () => {
        return /Android/.test(navigator.userAgent);
    };

    const divStyle = {
        width: isMobile ? (isIOS() ? '112%' : '101%') : '340px',
        height: isMobile ? '270px' : '280px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.5)',
        padding: '20px',
        position: 'relative',
        justifyContent: 'center'
    };

    const containerStyle = {
        position: 'absolute',
        top: '8px',
        left: isMobile ? '-5px' : '-10px',
        width: isMobile ? 'calc(100% + 10px)' : 'calc(100% + 20px)',
        height: '70px',
        backgroundColor: 'rgba(96, 92, 212, 255)',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        fontSize: isMobile ? '20px' : '28px',
    };

    const refundTextStyle = {
        fontSize: isMobile ? '17px' : '20px',
        fontWeight: '500',
        fontFamily: 'Nunito Sans, sans-serif'
    };

    const refundDetailStyle = {
        fontSize: isMobile ? '9px' : '10px',
        marginTop: '5px',
        fontFamily: 'Nunito Sans, sans-serif'
    };

    return (
        <div style={{ flexDirection: 'column', width: isMobile ? '' : '100%', marginRight: '10px', marginTop: isMobile ? '0px' : '' }}>
            <div style={divStyle}>
                <div style={containerStyle}>
                    <div style={refundTextStyle}>Get full refund if visa is not approved</div>
                    <div style={refundDetailStyle}>due to documents</div>
                </div>

                <div style={{ marginTop: '75px', marginLeft: '15px', marginRight: '15px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px', marginRight: '-2px' }}>
                        <span style={{ fontSize: 18, fontWeight: '500', fontFamily: 'Nunito Sans, sans-serif' }}>Travellers</span>
                        <div style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <button style={{ background: 'transparent', border: 'none', color: 'black', fontSize: 15 }} onClick={decrement}>-</button>
                            <span style={{ fontSize: 14.5, fontWeight: '500', fontFamily: 'Nunito Sans, sans-serif' }}>{count}</span>
                            <button style={{ background: 'transparent', border: 'none', color: 'black', fontSize: 15 }} onClick={increment}>+</button>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px' }}>
                        <span style={{ fontSize: 18, fontWeight: '500', fontFamily: 'Nunito Sans, sans-serif' }}>Price</span>
                        <span style={{ fontSize: 15, fontWeight: '500', fontFamily: 'Nunito Sans, sans-serif' }}> ₹{data.Price}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px' }}>
                        <span style={{ fontSize: 18, fontWeight: '500', fontFamily: 'Nunito Sans, sans-serif' }}>Discount</span>
                        <span style={{ fontSize: 15, fontWeight: '500', fontFamily: 'Nunito Sans, sans-serif', color: '#D45E95' }}>-10%</span>
                    </div>
                    <div style={{ width: '100%', height: '1.5px', backgroundColor: 'black', marginTop: '15px', marginBottom: '10px' }}></div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px' }}>
                        <span style={{ fontSize: 20, fontWeight: '800', fontFamily: 'Nunito Sans, sans-serif' }}>Total</span>
                        <span style={{ fontSize: 15, fontWeight: '800', fontFamily: 'Nunito Sans, sans-serif' }}>₹ {Math.round(Number(data.Price * count * 0.9))}</span>
                    </div>

                    <button style={{
                        width: '213px',
                        height: '35px',
                        marginTop: '20px',
                        display: 'block',
                        marginLeft: 'auto',
                        border: 'none',
                        borderRadius: '15px',
                        background: 'rgba(102, 197, 190, 255)',
                        marginRight: 'auto',
                        boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        fontFamily: 'Nunito Sans, sans-serif'
                    }}
                        onClick={handleBookSlotClick}
                    >
                        Book slot for FREE!
                    </button>
                </div>
            </div>

            {!isMobile && (
                <div style={{ marginTop: '20px' }}> {/* Adjust the margin as needed */}
                    <FaqSection data={faqs} />
                </div>
            )}

            <Modal showModal={showModal} closeModal={handleCloseModal} countryName={data.countryName} />
        </div>
    );
};

export default VisaPricing;
