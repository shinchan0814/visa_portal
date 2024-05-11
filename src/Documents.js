import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import './Documents.css';
import './styles.css'; // or import './styles.scss';

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

  return (
    <div style={{ width: '30%', marginTop: '40px', position: 'relative' }} className="documents-timeline">
      <h2 style={{ marginLeft: '15px', color: 'rgba(96, 92, 212, 255)', marginBottom: '6px', fontWeight: 'bolder', fontFamily: 'Nunito Sans, sans-serif'}}>Today, {formattedDate}</h2>
      {data.map((item, index) => (
        <div key={index} className="timeline-item">
          {index === 0 && (
            <div className="timeline-connector" style={{ left: '-60px', position: 'relative' }}>
              <div className="blue-sphere"></div>
            </div>
          )}
          {icons[item.document] && (
            <div className="timeline-connector" style={{ left: '-60px' }}>
              <div className="timeline-icon">
                <FontAwesomeIcon icon={['fas', icons[item.document]]} style={{ width: '25px', height: '25px' }} />
              </div>
            </div>
          )}
          <div className="timeline-content">
            <div className="timeline-title">
              <h3 style={{ marginBottom: '-2px', fontSize: 22, fontWeight: 900 , fontFamily: 'Nunito Sans, sans-serif'}}>{item.document}</h3>
            </div>
            <p style={{ fontSize: 14, fontWeight: 'lighter' , fontFamily: 'Nunito Sans, sans-serif'}}>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Documents;
