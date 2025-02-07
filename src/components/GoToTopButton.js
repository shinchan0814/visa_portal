import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      // Show button when user scrolls down 400px
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', checkScroll);
    checkScroll();

    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const styles = {
    button: {
      position: 'fixed',
      bottom: '24px',
      right: '16px',
      padding: '12px',
      backgroundColor: '#605CD4',
      color: 'white',
      borderRadius: '50%',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      cursor: 'pointer',
      transition: 'all 0.3s ease-in-out',
      border: 'none',
      display: isVisible ? 'block' : 'none',
      zIndex: 2000
    },
    icon: {
      width: '24px',
      height: '24px'
    }
  };

  return (
    <button onClick={scrollToTop} style={styles.button} aria-label="Go to top">
      <ArrowUp style={styles.icon} />
    </button>
  );
};

export default GoToTopButton;
