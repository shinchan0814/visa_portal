import React from 'react';
import './Documents.css'; 

const Documents = ({ data }) => {
  return (
    <div style={{ width: '55%', marginTop: '15px' }} className="documents-timeline">
      <h2 style={{marginLeft: '-15px'}}>Required Documents</h2>
      {data.map((item, index) => (
        <div key={index} className="timeline-item">
          {index >= 0 && (
            <div className="timeline-connector"></div>
          )}
          <div className="timeline-content">
            {index < data.length - 1 && (
              <div className="timeline-connector-vertical"></div>
            )}
            {index === data.length - 1 && (
              <div className="timeline-connector-circle"></div>
            )}
            <div className="timeline-connector-horizontal"></div>
            <h3>{item.document}</h3>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Documents;