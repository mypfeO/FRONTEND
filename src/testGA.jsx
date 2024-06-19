// src/testGA.js

import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';

const TestGA = () => {
  useEffect(() => {
    const codeBoard = 'G-5XRM3553RG'; // Use your codeBoard for testing
    ReactGA.initialize(codeBoard);
    ReactGA.send({ hitType: 'pageview', page: '/test' });

    console.log('GA initialized for testing with codeBoard:', codeBoard);
  }, []);

  const sendTestEvent = () => {
    ReactGA.event({
      category: 'Test',
      action: 'Button Click',
      label: 'Test Button'
    });
    console.log('Test event sent');
  };

  return (
    <div>
      <h1>Test Google Analytics</h1>
      <button onClick={sendTestEvent}>Send Test Event</button>
    </div>
  );
};

export default TestGA;
