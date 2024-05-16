import React, { useState, useEffect } from 'react';
import './FaqSection.css'; // Import the CSS file
import './styles.css'; // or import './styles.scss';

const FaqSection = ({ data = [] }) => {
  const [expandedFaq, setExpandedFaq] = useState(0); // Initialize to open the first item



  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

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

  const divStyle = {
    width: isMobile ? '100%' : '360px',
    height: isMobile ? '100vh' : '800px',
    borderRadius: '10px',
    padding: isMobile ? '5px' : '10px',
    position: 'relative',
    marginTop: isMobile ? '10px' :'-10px'
  };

  return (
    <div className="faq-section" style={divStyle}>
      <h2 style={{ marginBottom: '5px', fontFamily: 'Nunito Sans, sans-serif', fontSize: isMobile? '19px' : ''}}>Frequently Asked Questions</h2>
      {data.map((faq, index) => (
        <div key={index} className="faq-item">
          <button
            onClick={() => toggleFaq(index)}
            className="faq-question"
            style={{
              boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.125)',
              fontFamily: 'Nunito Sans, sans-serif',
              border: expandedFaq === index ? '2px solid rgba(74, 58, 255, 255)' : 'none', // Dynamic border style
            }}
          >
            <div className="question-container" style={{
              width: '100%',
              padding: '10px',
              borderRadius: '7px',
              display: 'flex', // Display children in a row
              alignItems: 'center', // Align children vertically centered
              justifyContent: 'space-between', // Space between children
              paddingLeft: '10px',
            }}>
              <span className="question-text" style={{ fontSize: 16, fontWeight: 'bold' }}>{faq.question}</span>
              {expandedFaq === index ? <img src="/images/website/Upword.png" alt="Image" style={{ maxWidth: '25.6px', maxHeight: '26.6px', paddingRight: '15px' }} />
                : <img src="/images/website/Right.png" alt="Image" style={{ maxWidth: '25.6px', maxHeight: '26.6px', paddingRight: '15px' }} />}
            </div>
          </button>

          {expandedFaq === index && (
            <div className="faq-answer" style={{ display: 'block', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.125)', fontFamily: 'Nunito Sans, sans-serif' }}> {/* Modify style to show answer */}
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FaqSection;
