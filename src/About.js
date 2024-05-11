import React from 'react';
import './About.css'; // Ensure you have a CSS file for styling

const About = ({ data = [] }) => {  // Set a default value for data
    if (!Array.isArray(data)) {  // Additional check to handle unexpected data types
        console.error('Expected data to be an array, received:', data);
        return <p>Error: Data is not available</p>;
    }

    return (
        <div style={{width: '55%'}} className="about-section">
            
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
