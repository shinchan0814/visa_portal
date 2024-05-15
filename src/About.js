import React, { useState, useEffect } from 'react';
import './About.css'; // Ensure you have a CSS file for styling

const About = ({ data = [] }) => {  // Set a default value for data
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

    if (!Array.isArray(data)) {  // Additional check to handle unexpected data types
        console.error('Expected data to be an array, received:', data);
        return <p>Error: Data is not available</p>;
    }

    return (
        <div style={{width: isMobile? '80%' : '55%', marginLeft: isMobile ? '5px' : ''}} className="about-section">
            
            {data.map((section, index) => (
                <div key={index} className="section-block" >
                    <h2 style={{fontFamily: 'Nunito Sans, sans-serif'}}>{section.heading}</h2>
                    <p style={{fontFamily: 'Nunito Sans, sans-serif'}}>{section.content}</p>
                </div>
            ))}
        </div>
    );
};

export default About;
