import React, { useState } from 'react';
import './FaqSection.css'; // Import the CSS file

const FaqSection = ({ data = [] }) => {
  const [expandedFaq, setExpandedFaq] = useState(0); // Initialize to open the first item



  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="faq-section" style={{ marginTop: '-10px' }}>
      <h2 style={{ marginBottom: '5px'}}>Frequently Asked Questions</h2>
      {data.map((faq, index) => (
        <div key={index} className="faq-item">
          <button
            onClick={() => toggleFaq(index)}
            className="faq-question"
            style={{
              boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.125)',
              border: expandedFaq === index ? '2px solid rgba(74, 58, 255, 255)' : 'none', // Dynamic border style
            }}
          >
            <div className="question-container" style={{
              width: '100%',
              height: '54px',
              borderRadius: '7px',
              display: 'flex', // Display children in a row
              alignItems: 'center', // Align children vertically centered
              justifyContent: 'space-between', // Space between children
              paddingLeft: '10px',
            }}>
              <span className="question-text" style={{ fontSize: 15, fontWeight: 'bold' }}>{faq.question}</span>
              {expandedFaq === index ? <img src="/images/website/Upword.png" alt="Image" style={{ maxWidth: '25.6px', maxHeight: '26.6px', paddingRight: '15px' }} />
                : <img src="/images/website/Right.png" alt="Image" style={{ maxWidth: '25.6px', maxHeight: '26.6px', paddingRight: '15px'}} />}
            </div>
          </button>

          {expandedFaq === index && (
            <div className="faq-answer" style={{ display: 'block' }}> {/* Modify style to show answer */}
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FaqSection;