import React from 'react';

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div style={styles.container}>
      {[...Array(totalSteps)].map((_, index) => (
        <div key={index} style={styles.step}>
          <div style={{
            ...styles.circle,
            backgroundColor: index < currentStep ? '#6366F1' : '#E0E7FF',
            color: index < currentStep ? 'white' : '#6366F1'
          }}>
            {index + 1}
          </div>
          {index < totalSteps - 1 && (
            <div style={{
              ...styles.line,
              backgroundColor: index < currentStep - 1 ? '#6366F1' : '#E0E7FF'
            }} />
          )}
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '500px',
    margin: '20px auto',
  },
  step: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  circle: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 'bold',
    fontSize: '14px',
    zIndex: 1,
  },
  line: {
    flex: 1,
    height: '3px',
    marginLeft: '-2px',
    marginRight: '-2px',
  },
};

export default ProgressIndicator;