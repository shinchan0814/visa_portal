import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
//import '../styles/Documents.module.css';
//import '../styles/styles.module.css'; // or import './styles.scss';

// Add all FontAwesome solid icons to the library
library.add(fas);

const Documents = ({ data }) => {
  const icons = {
    "Arrival": 'fa-plane-arrival',
    "Entry stamp": 'fa-stamp',
    "Fill application": 'fa-pen',
    "Gather documents": 'fa-folder-open',
    "Gather required documents": 'fa-folder-plus',
    "Medical examination": 'fa-stethoscope',
    "Online account": 'fa-user-circle',
    "Online application": 'fa-laptop-code',
    "Online payment": 'fa-credit-card',
    "Receive visa": 'fa-envelope-open-text',
    "Schedule appointment": 'fa-calendar-alt',
    "Submit documents": 'fa-upload',
    "Upload documents": 'fa-cloud-upload-alt',
    "Valid passport": 'fa-passport',
    "Visa application": 'fa-file-signature',
    "Visa processing": 'fa-cogs'
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

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
    <div style={{ width: isMobile ? '50%' :'30%', marginTop: '40px', position: 'relative' , marginLeft: isMobile ? '20px' : ''}} className="documents-timeline">
      <h2 style={{ marginLeft: '15px', color: 'rgba(96, 92, 212, 255)', marginBottom: isMobile ? '-15px' :'6px', fontWeight: 'bolder', fontFamily: 'Nunito Sans, sans-serif', fontSize: isMobile ? '20px' : '', fontWeight: isMobile ?  'bold' : ''}}>Today, {formattedDate}</h2>
      {data.map((item, index) => (
        <div key={index} className="timeline-item">
          {index === 0 && (
            <div className="timeline-connector" style={{ left: isMobile ? '-30px' :'-60px', position: 'relative' }}>
              <div className="blue-sphere" style={{left: isMobile ? '-7px' : ''}}></div>
            </div>
          )}
          {icons[item.document] && (
            <div className="timeline-connector" style={{ left: '-60px' }}>
              <div className="timeline-icon" style={{ color: index === data.length - 1 ? 'rgba(35, 160, 107, 255)' : '' }}>
                <FontAwesomeIcon icon={['fas', icons[item.document]]} style={{ width: '25px', height: '25px' }} />
              </div>
            </div>
          )}
          <div className="timeline-content">
            <div className="timeline-title">
              <h3 style={{ marginBottom: '-2px', fontSize: 22, fontWeight: 900 , fontFamily: 'Nunito Sans, sans-serif',  color: index === data.length - 1 ? 'rgba(35, 160, 107, 255)' : '' }}>{item.document}</h3>
            </div>
            <p style={{ fontSize: 14, fontWeight: 'lighter' , fontFamily: 'Nunito Sans, sans-serif',  color: index === data.length - 1 ? 'rgba(35, 160, 107, 255)' : '' }}>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Documents;
